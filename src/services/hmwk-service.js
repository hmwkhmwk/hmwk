const axios = require("axios").default;
const initMondayClient = require("monday-sdk-js");

const newMondayClient = (token = "") => {
  if (token === "") {
    token = process.env.API_TOKEN;
  }
  const monday = initMondayClient();
  monday.setToken(token);
  return monday;
};

class HmwkService {
  static async getAllStudents(studentsBoardId, token = "") {
    const monday = newMondayClient(token);
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
  static async getHmwkTrackingData(hmwkCompletionTrackingItemId, token = "") {
    const monday = newMondayClient(token);
    const query = `
    query {
      items(ids: ${hmwkCompletionTrackingItemId}) {
        name
        group {
          title
        }
        column_values{
          id
          text
        }
      }
    }
    `;

    const response = await monday.api(query);
    const item = response.data.items[0];

    // item looks like this:
    //
    // {
    //   "name": "Ronald Weasley",
    //   "group": {
    //     "title": "Enchantments I"
    //   },
    //   "column_values": [
    //     {
    //       "id": "date4",
    //       "title": "Due date",
    //       "text": "2020-11-16"
    //     },
    //     {
    //       "id": "status",
    //       "title": "Status",
    //       "text": "Not Submitted"
    //     },
    //     {
    //       "id": "text9",
    //       "title": "UniqueLink",
    //       "text": "https://www.hmwk.herokuapp.com/submission?token=04df901109872f9a40a02711d709be1f355655f2"
    //     },
    //     {
    //       "id": "files",
    //       "title": "hmwk file",
    //       "text": ""
    //     },
    //     {
    //       "id": "text",
    //       "title": "Grade",
    //       "text": ""
    //     },
    //     {
    //       "id": "email9",
    //       "title": "Email",
    //       "text": "hmwkapp@gmail.com"
    //     },
    //     {
    //       "id": "text809",
    //       "title": "Comment",
    //       "text": "Well Done!"
    //     }
    //   ]
    // }
    //
    // We want to convert to this:
    //
    // {
    //   studentName: "Ronald Weasley",      // name
    //   hmwkTitle: "Enchantments I"         // group.title
    //   dueDate: "2020-11-16",              // date4
    //   status: "Not Submitted",            // status
    //   uniqueLink: "https://www.hmwk.herokuapp.com/submission?token=04df901109872f9a40a02711d709be1f355655f2",
    //                                       // text9
    //   file: "",                           // files
    //   grade: "",                          // text
    //   studentEmail: "hmwkapp@gmail.com",  // email9
    //   comment: "Well done!",              // text809
    // }
    const data = {
      studentName: item.name,
      hmwkTitle: item.group.title,
    };
    for (let cv of item.column_values) {
      switch (cv.id) {
        case "date4":
          data.dueDate = cv.text;
          break;
        case "status":
          data.status = cv.text;
          break;
        case "text9":
          data.uniqueLink = cv.text;
          break;
        case "files":
          data.file = cv.text;
          break;
        case "text":
          data.grade = cv.text;
          break;
        case "email9":
          data.studentEmail = cv.text;
          break;
        case "text809":
          data.comment = cv.text;
          break;
        default:
          throw `Unrecognized column id "${cv.id}" in hmwk_completion_tracking board...`;
      }
    }
    return data;
  }

  static async getHmwkDetail(hmwkAssignmentsBoardId, token = "") {
    const monday = newMondayClient(token);
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

  static async deleteAllHmwkAssignmentsItems(hmwkAssignmentsId, token = "") {
    await HmwkService._deleteAllItems(hmwkAssignmentsId, token);
  }

  static async deleteAllStudentsItems(studentsId, token = "") {
    await HmwkService._deleteAllItems(studentsId, token);
  }

  static async deleteAllHmwkCompletionTrackingItems(
    hmwkCompletionTrackingId,
    token = ""
  ) {
    await HmwkService._deleteAllItems(hmwkCompletionTrackingId, token);
  }

  static async _deleteAllItems(boardId, token = "") {
    const monday = newMondayClient(token);
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

  static async seedHmwkAssignments(
    hmwkAssignmentsId,
    assignmentsGroup,
    assignments,
    token = ""
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
      f,
      token
    );
  }

  static async seedStudents(studentsId, studentsGroup, students, token = "") {
    const monday = newMondayClient(token);
    const f = (student) => {
      return {
        // Contrary to the API docs, you NEED to supply text.
        email7: {
          email: student.email7,
          text: student.email7,
        },
      };
    };
    return await HmwkService._seedBoard(
      studentsId,
      studentsGroup,
      students,
      f,
      token
    );
  }

  static async seedHmwkCompletionTracking(
    hmwkCompletionTrackingId,
    assignmentsTrackerGroup,
    assignmentsTracker,
    token = ""
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
      f,
      token
    );
  }

  static async _seedBoard(
    boardId,
    groupName,
    items,
    columnValueFunc,
    token = ""
  ) {
    const monday = newMondayClient(token);
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

  static async clearFileColumn(boardId, itemId, columnId, token) {
    const monday = newMondayClient(token);
    console.log(
      `Clearing the file column - boardId: ${boardId}, itemId: ${itemId}`
    );
    const columnValue = escapeDoubleQuotes(
      JSON.stringify({
        clear_all: true,
      })
    );
    const query = `mutation 
    {
      change_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: ${columnId}, value: "${columnValue}") 
      {
        id
      }
    }`;
    const resp = await monday.api(query);
    if (resp.errors) {
      throw resp.errors;
    }
  }

  // Upload a PDF to monday.com
  // Reference: https://gist.github.com/yuhgto/edb5d96e088599c2a6ea44860df9117b
  static async uploadPDF(
    pdfName,
    content,
    itemId,
    hmwkCompletionTrackingBoardId,
    token = ""
  ) {
    if (token === "") {
      token = process.env.API_TOKEN;
    }
    // Hard-coded column ID for homework file column.
    const columnId = "files";
    await HmwkService.clearFileColumn(
      hmwkCompletionTrackingBoardId,
      itemId,
      columnId
    );
    const query = `mutation ($file: File!) { add_file_to_column (item_id: ${itemId}, column_id: "${columnId}", file: $file) { id } }`;
    const boundary = "xxxxxxxxxx";
    const headers = {
      Authorization: token,
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
