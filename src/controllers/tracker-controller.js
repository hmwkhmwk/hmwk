/**
 * monday.com track currently just console.logs the request
 * @param {Request} req
 * @param {Response} res
 */

const HmwkService = require("../services/hmwk-service");

/* this function tracks when an assignment's status changes from
"Not Ready" to "Send to Students" which will call .getAllStudents() 
to fetch all students info.
It will also take in the assignment name and due date.
It will then create a new group in the board hmwk-completion-tracking
and create as many items in the group as there are students in the
students table...
Finally, populate this group name = assignment name;
student name = each student from students board
due date column = due date of the assignment
status = "Not Submitted"
*/

async function track(req, res) {
  console.log("request", req);
  // Yunice's code (originally in hmwk-service.js)

  // const { payload } = req.body;
  // const { inboundFieldValues } = payload;
  // const { studentsBoardId } = inboundFieldValues;

  // const students = await HmwkService.getAllStudents(studentsBoardId);
  // if (!students) {
  //   console.log("You have no students on the board")
  //   return res.status(200).send({});
  // }

  return res.status(200).send({});
}

module.exports = {
  track,
};
