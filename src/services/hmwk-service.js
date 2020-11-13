const initMondayClient = require("monday-sdk-js");

class HmwkService {
    static async getAllStudents(token, studentsBoardId) {
        try {
            const mondayClient = initMondayClient();
            mondayClient.setToken(token);

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

            const response = await mondayClient.api(query, { variables });
            const studentInfo = response.data.boards.items;
            return studentInfo; //array of json
            //student name: student_info[i].name
            //student email: student_info[i].column_values.text
        } catch (err) {
            console.log(err);
        }
    }

    static async createNewHmwk(token, hmwkCompletionTrackingBoardId, hmwkName) {
        try {
            const mondayClient = initMondayClient();
            mondayClient.setToken(token);

            //create a group at HmwkCompletionTrackingBoard with hmwkName
            const query = `mutation {
                create_group (board_id: $hmwkCompletionTrackingBoardId, group_name: $hmwkName) {
                    id
                }
            }`;

            const variables = { hmwkCompletionTrackingBoardId, hmwkName };

            await mondayClient.api(query, { variables });
        } catch (err) {
            console.log(err);
        }
    }

    static async populateHmwkCompletionTrackingBoard(
        token,
        hmwkCompletionTrackingBoardId,
        studentInfo,
        hmwkName,
        dueDate
    ) {
        try {
            const mondayClient = initMondayClient();
            mondayClient.setToken(token);

            //create a group at HmwkCompletionTrackingBoard with hmwkName
            this.createNewHmwk(token, hmwkCompletionTrackingBoardId, hmwkName);

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
                await mondayClient.api(query, { variables });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = HmwkService;
