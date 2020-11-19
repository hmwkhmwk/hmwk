/**
 * monday.com track currently just console.logs the request
 * @param {Request} req
 * @param {Response} res
 */

const HmwkService = require("../services/hmwk-service");
const { generateSubmissionLink } = require("../utils/submission-link");

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
  console.log(
    `Incoming track request with request.body=${JSON.stringify(req.body)}`
  );

  // unmarshal
  const { payload } = req.body;
  const { inboundFieldValues } = payload;
  const {
    studentsBoardId,
    hmwkCompletionTrackingBoardId,
    hmwkAssignmentsBoardId,
    itemId,
  } = inboundFieldValues;
  console.log(
    `
    Unmarshalled request: studentsBoardId=${studentsBoardId},
    hmwkCompletionTrackingBoardId=${hmwkCompletionTrackingBoardId},
    hmwkAssignmentsBoardId=${hmwkAssignmentsBoardId}
    itemId=${itemId}
    `
  );

  const studentInfo = await _getStudentInfo(studentsBoardId);
  console.log(
    `Fetched all students from student Board: ${JSON.stringify(studentInfo)}`
  );

  const hmwkDetails = await HmwkService.getHmwkDetail(itemId);
  console.log(`Fetched hmwkDetails: ${JSON.stringify(hmwkDetails)}`);

  await HmwkService.createNewHmwk(
    hmwkCompletionTrackingBoardId,
    hmwkDetails.hmwkName
  );

  // TODO: generate unique link for each student

  return res.status(200).send({});
}

async function _getStudentInfo(studentsBoardId) {
  const studentInfo = await HmwkService.getAllStudents(studentsBoardId);
  if (!studentInfo || studentInfo.length == 0) {
    console.log("You have no students on the board");
    return res.status(200).send({});
  }

  return studentInfo;
}

module.exports = {
  track,
};
