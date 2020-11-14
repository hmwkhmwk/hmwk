"use strict";

require("dotenv").config();
const axios = require("axios").default;
const { newDB, RESEED_PATH_PREFIX } = require("../db");
const { DataError } = require("node-json-db/dist/lib/Errors");

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
    `[dry run] Deleting all items in hmwk_assignments board (id=${hmwkAssignmentsId})`
  );
  console.log("[dry run] Inserting seed items in hmwk_assignments board");

  // Reseed students.
  console.log(
    `[dry run] Deleting all items in students board (id=${studentsId})`
  );
  console.log("[dry run] Inserting seed items in students board");

  // Reseed hmwk_completion_tracking.
  console.log(
    `[dry run] Deleting all items in hmwk_completion_tracking board (id=${hmwkCompletionTrackingId})`
  );
  console.log(
    "[dry run] Inserting seed items in hmwk_completion_tracking board"
  );

  // Notify user.
  console.log(`[dry run] Sending request to ${webhookUrl}`);
  const res = await axios.post(
    webhookUrl,
    { trigger: {} },
    {
      headers: {
        Authorization: process.env.MONDAY_SIGNING_SECRET,
      },
    }
  );
  console.log(res.data);
  console.log(`${res.status} ${res.statusText}`);
}

// We've separated the `reseed` function from the `runReseed` function.
// This way we can isolate the error handling and exit trapping.
// The `reseed` function is concerned only with modifying the database.
async function runReseed() {
  const db = newDB();
  const subs = db.getData(RESEED_PATH_PREFIX);
  for (let subID in subs) {
    try {
      await reseed(subID, subs[subID]);
    } catch (err) {
      if (err instanceof DataError) {
        console.error("DataError:", err);
      } else {
        console.error("Unrecognized error:", err);
      }
      console.log("Ignoring error and continuing to next subID...");
    }
    console.log("");
  }
  console.log("Done reseeding.");
}

// Execute the `reseed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runReseed();
}

// We export the reseed function for testing purposes.
module.exports = reseed;
