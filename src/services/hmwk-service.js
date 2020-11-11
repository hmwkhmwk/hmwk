const initMondayClient = require('monday-sdk-js');


class HmwkService {
    //not yet done
    static async getAllStudents(token, studentsBoardId) {
        try {
            const mondayClient = initMondayClient();
            mondayClient.setToken(token);

            const query = `query{
                boards(ids: $studentsBoardId){
                    items
                }
            }`

            const variables = { studentsBoardId };

            const response = await mondayClient.api(query, { variables });
            return response.data.items;
        } catch (err) {
            console.log(err);
        }
    }

}
  
module.exports = HmwkService;