const HmwkService = require("../services/hmwk-service");
const {
  generateSubmissionLink,
  parseToken,
} = require("../utils/submission-link");
const { newDB, TRACKER_PATH_PREFIX, SUBMIT_PATH_PREFIX } = require("../db");

// TODO(lrt98802, YuniceXiao): Utilize db to read/write to /tracker and /submit.
const db = newDB();

// Submission link will look like: "https://hmwkhmwk.herokuapp.com/?token=xxxxxxx"
const HOST = "https://hmwkhmwk.herokuapp.com/";
const END_POINT = "";

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

  // Check if run already.
  const trackerPath = `${TRACKER_PATH_PREFIX}/${itemId}`;
  const exists = await db.exists(trackerPath);
  const trackerVal = await db.getData(trackerPath);
  if (exists && trackerVal.done) {
    return res.status(200).send({});
  }
  await db.push(trackerPath, { done: false });

  const studentInfo = await _getStudentInfo(studentsBoardId);
  console.log(
    `Fetched all students from student Board: ${JSON.stringify(studentInfo)}`
  );

  const hmwkDetails = await HmwkService.getHmwkDetail(itemId);
  console.log(`Fetched hmwkDetails: ${JSON.stringify(hmwkDetails)}`);

  let assignments = [];
  for (let student of studentInfo) {
    // Preparing data for populating hmwkCompletionTrackingBoard
    const data = {
      name: student.name, // Student Name
      date4: hmwkDetails.dueDate, // Due Date
      status: "Not Submitted", // Submission Status
      text9: generateSubmissionLink(HOST, END_POINT), // Unique Link
      email9: student.column_values[0].text, // Student Email
    };
    assignments.push(data);
  }

  const resps = await HmwkService.seedHmwkCompletionTracking(
    hmwkCompletionTrackingBoardId,
    hmwkDetails.hmwkName,
    assignments
  );

  // Store unique-link to itemId mapping in /submit.
  for (let i = 0; i < resps.length; i++) {
    const hmwkCompletionTrackingItemId = resps[i].data.create_item.id;
    const uniqueToken = parseToken(assignments[i].text9);
    await db.push(`${SUBMIT_PATH_PREFIX}/${uniqueToken}`, {
      hmwkCompletionTrackingItemId: hmwkCompletionTrackingItemId,
      hmwkAssignmentsItemId: itemId,
      hmwkCompletionTrackingBoardId: hmwkCompletionTrackingBoardId,
    });
  }

  // Store a successful run in /tracker.
  await db.push(trackerPath, { done: true });

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
