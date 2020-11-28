"use strict";

require("dotenv").config();
const axios = require("axios").default;
const {
  newDB,
  RESEED_PATH_PREFIX,
  TRACKER_PATH_PREFIX,
  SUBMIT_PATH_PREFIX,
} = require("../db");
const { DataError } = require("node-json-db/dist/lib/Errors");
const HmwkService = require("../services/hmwk-service");
const seed = require("./seed");

async function reseed(subID, sub) {
  console.log(`For subscription ID ${subID}...`);
  const {
    webhookUrl,
    hmwkAssignmentsId,
    studentsId,
    hmwkCompletionTrackingId,
  } = sub;

  // Reseed hmwk_assignments.
  console.log(
    `Deleting all items in hmwk_assignments (id=${hmwkAssignmentsId})`
  );
  await HmwkService.deleteAllHmwkAssignmentsItems(hmwkAssignmentsId);
  console.log(`Seeding hmwk_assignments`);
  await HmwkService.seedHmwkAssignments(
    hmwkAssignmentsId,
    seed.assignmentsGroup,
    seed.assignments
  );

  // Reseed students.
  console.log(`Deleting all items in students board (id=${studentsId})`);
  await HmwkService.deleteAllStudentsItems(studentsId);
  console.log("Seeding students");
  await HmwkService.seedStudents(studentsId, seed.studentsGroup, seed.students);

  // Reseed hmwk_completion_tracking.
  console.log(
    `Deleting all items in hmwk_completion_tracking (id=${hmwkCompletionTrackingId})`
  );
  await HmwkService.deleteAllHmwkCompletionTrackingItems(
    hmwkCompletionTrackingId
  );
  console.log("Seeding hmwk_completion_tracking");
  await HmwkService.seedHmwkCompletionTracking(
    hmwkCompletionTrackingId,
    seed.assignmentsTracker1Group,
    seed.assignmentsTracker1
  );
  await HmwkService.seedHmwkCompletionTracking(
    hmwkCompletionTrackingId,
    seed.assignmentsTracker2Group,
    seed.assignmentsTracker2
  );

  // Notify user.
  // TODO(victor): Delete this block of code is it's too spammy.
  // console.log(`Sending request to ${webhookUrl}`);
  // const res = await axios.post(
  //   webhookUrl,
  //   { trigger: {} },
  //   {
  //     headers: {
  //       Authorization: process.env.MONDAY_SIGNING_SECRET,
  //     },
  //   }
  // );
  // console.log(res.data);
  // console.log(`${res.status} ${res.statusText}`);
}

// We've separated the `reseed` function from the `runReseed` function.
// This way we can isolate the error handling and exit trapping.
// The `reseed` function is concerned only with modifying the database.
async function runReseed() {
  const db = newDB();
  const subs = await db.getData(RESEED_PATH_PREFIX);
  for (let subID in subs) {
    try {
      await reseed(subID, subs[subID]);
    } catch (err) {
      if (err instanceof DataError) {
        console.error("DataError:", err);
      } else {
        console.error("Unrecognized error:", err);
      }
      throw err;
    }
    console.log("");
  }
  await resetDB(db);
  console.log("Done reseeding.");
  console.log(
    'Do not run "npm run reseed" too many times in a short amount of time. ' +
      "You can get rate-limited by monday.com. " +
      "See https://monday.com/developers/v2#rate-limits-section for more info."
  );
}

async function resetDB(db) {
  await db.delete(TRACKER_PATH_PREFIX);
  console.log(`Deleted ${TRACKER_PATH_PREFIX} in database`);
  await db.delete(SUBMIT_PATH_PREFIX);
  console.log(`Deleted ${SUBMIT_PATH_PREFIX} in database`);
}

// Execute the `reseed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runReseed();
}

// We export the reseed function for testing purposes.
module.exports = reseed;
