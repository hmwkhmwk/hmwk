/**
 * Demo script to showcase how to upload PDFs onto monday.com.
 * A successful run means that ImageService and HmwkService are working as intended.
 *
 * npm run src/scripts/upload.js
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const axios = require("axios").default;
require("dotenv").config();

const HmwkService = require("../services/hmwk-service");
const { ImageService } = require("../services/image-service");

async function run() {
  // Download a sample png.
  const imageUrl = "https://dummyimage.com/165x245.png/cc0000/ffffff";
  const imageResp = await axios.get(imageUrl, { responseType: "arraybuffer" });

  // Convert png to pdf.
  ImageService.writeSync("sample.png", imageResp.data);
  const content = ImageService.convertToPDFSync("sample.png", "sample.pdf");

  // Upload to monday.com.
  const itemId = 870130469;
  try {
    const uploadResp = await HmwkService.uploadPDF(
      "sample.pdf",
      content,
      itemId
    );
    console.log("uploadResp.data:", uploadResp.data);
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("err.response.data:", err.response.data);
      console.log("err.response.status:", err.response.status);
      console.log("err.response.headers:", err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("err.request:", err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("err.message:", err.message);
    }
    console.log("err.config:", err.config);
  }
}

if (module === require.main) {
  run().finally(() => {
    ImageService.deleteSync("sample.png");
    ImageService.deleteSync("sample.pdf");
  });
}
