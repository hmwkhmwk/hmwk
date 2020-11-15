const API_TOKEN = process.env.API_TOKEN;
const monday = require("monday-sdk-js")();
monday.setToken(API_TOKEN);

class HmwkService {
  // used for the tracker-controller
  static async getAllStudents(studentsBoardId) {
    const query = `query {
            boards(ids: $studentsBoardId) {
                items {
                    name
        
                    column_values {
                        value
                        text
                    }
                }
            }
        }`;

    const variables = { studentsBoardId };

    const response = await monday.api(query, { variables });
    const studentInfo = response.data.boards.items;
    return studentInfo; //array of json
    //student name: student_info[i].name
    //student email: student_info[i].column_values.text
  }

  // used for the tracker-controller
  static async createNewHmwk(hmwkCompletionTrackingBoardId, hmwkName) {
    //create a group at HmwkCompletionTrackingBoard with hmwkName
    const query = `mutation {
            create_group (board_id: $hmwkCompletionTrackingBoardId, group_name: $hmwkName) {
                id
            }
        }`;

    const variables = { hmwkCompletionTrackingBoardId, hmwkName };

    await monday.api(query, { variables });
  }

  // used for the tracker-controller
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
      const query = `mutation {
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
}

module.exports = HmwkService;
