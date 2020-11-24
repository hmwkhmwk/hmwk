const axios = require("axios").default;
const monday = require("monday-sdk-js")();

const API_TOKEN = process.env.API_TOKEN;
monday.setToken(API_TOKEN);

class HmwkService {
  static async getAllStudents(studentsBoardId) {
    const query = `
      query {
        boards(ids: ${studentsBoardId}) {
          items {
            name
            column_values {
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

  // Grab STUDENT NAME for our student API
  static async getHmwkTrackingData(hmwkCompletionTrackingItemId) {
    const query = `
    query {
      items(ids: ${hmwkCompletionTrackingItemId}) {
        name
        column_values{
          id
          text
        }
      }
    }
    `;

    const response = await monday.api(query);
    const hmwkTrackingData = response.data.items[0];

    return hmwkTrackingData;
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
    return await HmwkService._seedBoard(
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
    return await HmwkService._seedBoard(studentsId, studentsGroup, students, f);
  }

  // TODO(victor): Add file upload support.
  static async seedHmwkCompletionTracking(
    hmwkCompletionTrackingId,
    assignmentsTrackerGroup,
    assignmentsTracker
  ) {
    const f = (at) => {
      return {
        date4: { date: at.date4 }, // Due Date
        status: { label: at.status }, // Submission Status
        text9: at.text9, // Unique Submission Link
        text: at.text, // Grade
        email9: {
          email: at.email9,
          text: at.email9,
        }, // Student Email
      };
    };
    return await HmwkService._seedBoard(
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
    let resps = [];
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
      resps.push(resp);
    }
    return resps;
  }

  // Upload a PDF to monday.com
  // Reference: https://gist.github.com/yuhgto/edb5d96e088599c2a6ea44860df9117b
  static async uploadPDF(pdfName, content, itemId) {
    // Hard-coded column ID for homework file column.
    const columnId = "files";
    const query = `mutation ($file: File!) { add_file_to_column (item_id: ${itemId}, column_id: "${columnId}", file: $file) { id } }`;
    const boundary = "xxxxxxxxxx";
    const headers = {
      Authorization: API_TOKEN,
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    };

    // Construct query part.
    let data = "";
    data += `--${boundary}\r\n`;
    data += 'Content-Disposition: form-data; name="query"; \r\n';
    data += "Content-Type:application/json\r\n\r\n";
    data += `\r\n${query}\r\n`;

    // Construct file part.
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="variables[file]"; filename="${pdfName}"\r\n`;
    data += `Content-Type:application/pdf\r\n\r\n`;

    const payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      Buffer.from(content, "binary"),
      Buffer.from(`\r\n--${boundary}--\r\n`, "utf8"),
    ]);

    // Send request.
    return await axios({
      method: "post",
      url: "https://api.monday.com/v2/file",
      headers: headers,
      data: payload,
    });
  }
}

// NOTE: only escapes a " if it's not already escaped
function escapeDoubleQuotes(str) {
  return str.replace(/\\([\s\S])|(")/g, "\\$1$2");
}

module.exports = HmwkService;
