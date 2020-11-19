const API_TOKEN = process.env.API_TOKEN;
const monday = require("monday-sdk-js")();
monday.setToken(API_TOKEN);

class HmwkService {
  static async getAllStudents(studentsBoardId) {
    const query = `
      query {
        boards(ids: ${studentsBoardId}) {
          items {
            name
            column_values {
              value
              text
            }
          }
        }
      }`;

    const response = await monday.api(query);

    // Since we are only querying 1 single students Board), index 0 at boards array
    const studentInfo = response.data.boards[0].items;
    return studentInfo; //array of json
    //student name: student_info[i].name
    //student email: student_info[i].column_values.text
  }

  static async getHmwkDetail(hmwkAssignmentsBoardId) {
    const query = `
      query {
        items(ids: ${hmwkAssignmentsBoardId}) {
          name
          column_values {
            text
          }
        }
      }`;

    const response = await monday.api(query);

    // Since we are only querying 1 item, index 0 at items array
    const hmwkName = response.data.items[0].name;

    // Get the homework due date which is at the last column
    const itemValues = response.data.items[0].column_values;
    const dueDateText = itemValues[itemValues.length - 1].text; // Date column needs to be a string in a YYYY-MM-DD format

    const hmwkDetails = {
      hmwkName: hmwkName,
      dueDate: dueDateText,
    };

    return hmwkDetails;
  }

  static async createNewHmwk(hmwkCompletionTrackingBoardId, hmwkName) {
    //create a group at HmwkCompletionTrackingBoard with hmwkName
    const mutation = `
      mutation {
        create_group (board_id: ${hmwkCompletionTrackingBoardId}, group_name: ${hmwkName}) {
          id
        }
      }`;

    const resp = await monday.api(mutation);
    if (resp.errors) {
      console.log(`Received errors while creating new hmwk: ${resp.errors}`);
      throw resp.errors;
    }

    const groupId = resp.data.create_group.id;
    console.log(`Created group ${groupId} under hmwkCompletionTrackingBoard`);
  }

  static async populateHmwkCompletionTrackingBoard(
    hmwkCompletionTrackingBoardId,
    studentInfo,
    hmwkName,
    dueDate
  ) {
    //create a group at HmwkCompletionTrackingBoard with hmwkName
    HmwkService.createNewHmwk(hmwkCompletionTrackingBoardId, hmwkName);

    //create items under the group and fill up student name, due date and status
    const column_values = JSON.stringify({
      date4: dueDate,
      status: "Not Submitted",
    });

    for (let i = 0; i < studentInfo.length; i++) {
      studentName = studentInfo[i].name;
      const query = `
        mutation {
          create_item(board_id: $hmwkCompletionTrackingBoardId, group_id: $hmwkName, item_name: $studentName, column_values: $column_values) {
            id
          }
        }`;

      const variables = {
        hmwkCompletionTrackingBoardId,
        hmwkName,
        studentInfo,
        column_values,
      };
      await monday.api(query, { variables });
    }
  }

  static async deleteAllHmwkAssignmentsItems(hmwkAssignmentsId) {
    await HmwkService._deleteAllItems(hmwkAssignmentsId);
  }

  static async deleteAllStudentsItems(studentsId) {
    await HmwkService._deleteAllItems(studentsId);
  }

  static async deleteAllHmwkCompletionTrackingItems(hmwkCompletionTrackingId) {
    await HmwkService._deleteAllItems(hmwkCompletionTrackingId);
  }

  static async _deleteAllItems(boardId) {
    // Get all groups in hmwk_assignments.
    const query = `
      query {
        boards(ids: ${boardId}) {
          groups {
            id
          }
        }
      }`;
    const resp = await monday.api(query);
    if (resp.errors) {
      throw resp.errors;
    }

    // Delete each group. Items in the group are auto-deleted.
    const groupIDs = resp.data.boards[0].groups.map((g) => g.id);
    for (let gID of groupIDs) {
      const mutation = `
        mutation {
          delete_group(board_id: ${boardId}, group_id: ${gID}) {
            title
          }
        }`;
      const resp = await monday.api(mutation);
      if (resp.errors) {
        throw resp.errors;
      }
      console.log(`Deleted ${resp.data.delete_group.title}.`);
    }
  }

  // TODO(victor): Add file upload support.
  static async seedHmwkAssignments(
    hmwkAssignmentsId,
    assignmentsGroup,
    assignments
  ) {
    const f = (assignment) => {
      return {
        description_for_homework: {
          text: assignment.description_for_homework,
        },
        status: { label: assignment.status },
        date4: { date: assignment.date4 },
      };
    };
    await HmwkService._seedBoard(
      hmwkAssignmentsId,
      assignmentsGroup,
      assignments,
      f
    );
  }

  static async seedStudents(studentsId, studentsGroup, students) {
    const f = (student) => {
      return {
        // Contrary to the API docs, you NEED to supply text.
        email7: {
          email: student.email7,
          text: student.email7,
        },
      };
    };
    await HmwkService._seedBoard(studentsId, studentsGroup, students, f);
  }

  // TODO(victor): Add file upload support.
  static async seedHmwkCompletionTracking(
    hmwkCompletionTrackingId,
    assignmentsTrackerGroup,
    assignmentsTracker
  ) {
    const f = (at) => {
      return {
        date4: { date: at.date4 },
        status: { label: at.status },
        text9: at.text9,
        text: at.text,
      };
    };
    await HmwkService._seedBoard(
      hmwkCompletionTrackingId,
      assignmentsTrackerGroup,
      assignmentsTracker,
      f
    );
  }

  static async _seedBoard(boardId, groupName, items, columnValueFunc) {
    // Create a group.
    const mutation = `
      mutation {
        create_group (board_id: ${boardId}, group_name: "${groupName}") {
          id
        }
      }`;
    const resp = await monday.api(mutation);
    if (resp.errors) {
      throw resp.errors;
    }
    const groupID = resp.data.create_group.id;
    console.log(`Created group "${groupName}"`);

    // Create items under the newly created group.
    for (let item of items) {
      // https://monday.com/developers/v2#column-values-section
      // NOTE: Although the API docs say only board_id is required,
      // actually, board_id, group_id AND item_name are required.
      const columnValues = escapeDoubleQuotes(
        JSON.stringify(columnValueFunc(item))
      );
      const mutation = `
        mutation {
          create_item (
            board_id: ${boardId},
            group_id: ${groupID},
            item_name: "${item.name}",
            column_values: "${columnValues}")
          {
            id
          }
        }`;
      const resp = await monday.api(mutation);
      if (resp.errors) {
        throw resp.errors;
      }
      console.log(`Created item "${item.name}"`);
    }
  }
}

// NOTE: only escapes a " if it's not already escaped
function escapeDoubleQuotes(str) {
  return str.replace(/\\([\s\S])|(")/g, "\\$1$2");
}

module.exports = HmwkService;
