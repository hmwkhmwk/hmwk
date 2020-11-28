const path = require("path");

const router = require("express").Router();
const fileUpload = require("express-fileupload");

const { newDB, SUBMIT_PATH_PREFIX } = require("../db");
const HmwkService = require("../services/hmwk-service");
const { ImageService, TMP_DIR } = require("../services/image-service");

const db = newDB();

// https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
// TODO(victor): I put the implementation here instead of in a controller b/c I'm lazy.
router.post("/api/submit", fileUpload(), async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const photoFile = req.files.photo;

  // try {
  //   await photoFile.mv(`${TMP_DIR}/${photoFile.name}`);
  // } catch (err) {
  //   next(err);
  // }
  ImageService.writeSync(photoFile.name, photoFile.data.toString("binary"));

  const {
    hmwkCompletionTrackingItemId,
    hmwkCompletionTrackingBoardId,
  } = await db.getData(`${SUBMIT_PATH_PREFIX}/${req.body.token}`);

  // Convert to PDF.
  const pdfName = `${path.parse(photoFile.name).name}.pdf`;
  const pdfContent = ImageService.convertToPDFSync(photoFile.name, pdfName);

  // Upload PDF.
  try {
    const uploadResp = await HmwkService.uploadPDF(
      pdfName,
      pdfContent,
      hmwkCompletionTrackingItemId,
      hmwkCompletionTrackingBoardId
    );
    console.log("monday.com upload resp:", uploadResp.data);
    res.send("File uploaded to monday.com!");
  } catch (err) {
    if (err.response) {
      console.log("err.response.data:", err.response.data);
      console.log("err.response.status:", err.response.status);
      console.log("err.response.headers:", err.response.headers);
    } else if (err.request) {
      console.log("err.request:", err.request);
    } else {
      console.log("err.message:", err.message);
    }
    console.log("err.config:", err.config);
    res.status(500).send("uh oh");
  }
});

module.exports = router;
