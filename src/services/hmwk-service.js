const initMondayClient = require('monday-sdk-js');


class HmwkService {
    //not yet done
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
              }`

            const variables = { studentsBoardId };

            const response = await mondayClient.api(query, { variables });
            const student_info = response.data.boards.items
            return student_info //array of json
            //student name: student_info[i].name 
            //student email: student_info[i].column_values.text

        } catch (err) {
            console.log(err);
        }
    }

}
  
module.exports = HmwkService;
