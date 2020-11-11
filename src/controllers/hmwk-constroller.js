const mondayService = require('../services/monday-service');
//const transformationService = require('../services/transformation-service');
//const { TRANSFORMATION_TYPES } = require('../constants');
const API_TOKEN = process.env.API_TOKEN;



//a function to handle status change from "Not Ready" to "Send to Students" which will call .getAllStudents() to fetch all students info
async function handleStatusChange(req, res) {
    const { payload } = req.body;
    const { inboundFieldValues } = payload;
    const { studentsBoardId } = inboundFieldValues;
  
    const token = API_TOKEN;
    const students = await mondayService.getAllStudents(token, studentsBoardId);
    if (!students) {
      return res.status(200).send({});
    }
    
    return res.status(200).send({});
}


module.exports = {
    handleStatusChange
  };
  