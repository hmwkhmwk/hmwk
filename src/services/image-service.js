const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

// https://stackoverflow.com/a/18721515/859840
const APP_DIR = path.dirname(require.main.filename);

const TMP_DIR = path.join(APP_DIR, "tmp");

// Service encapsulating all image-related functionality.
class ImageService {
  /**
   * Save a file to the temporary directory. Warning: this function is synchronous/blocking.
   * @param {string} filepath Path (relative to TMP_DIR).
   * @param {string} content File content.
   * @param {string} encoding File encoding.
   */
  static writeSync(filepath, content, encoding = "binary") {
    // Hacky way of making tmp dir.
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR);
    }
    filepath = path.join(TMP_DIR, filepath);
    fs.writeFileSync(filepath, content, { encoding });
  }

  /**
   * Read the contents of a file.
   * @param {string} filepath Path (relative to TMP_DIR).
   * @returns {(string|Buffer)} The file content.
   */
  static readSync(filepath) {
    return fs.readFileSync(path.join(TMP_DIR, filepath));
  }

  /**
   * Delete a file. This is a no-op if the filepath doesn't exist.
   * @param {string} filepath Path (relative to TMP_DIR).
   */
  static deleteSync(filepath) {
    filepath = path.join(TMP_DIR, filepath);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log("Deleted", filepath);
    }
  }

  /**
   * Convert image to PDF. Warning: this function is synchronous/blocking.
   * @param {string} inpath Path (relative to TMP_DIR) of the input image file.
   * @param {string} outpath Path (relative to TMP_DIR) of the output PDF file.
   * @returns {(string|Buffer)} Content of the PDF file.
   */
  static convertToPDFSync(inpath, outpath) {
    inpath = path.join(TMP_DIR, inpath);
    outpath = path.join(TMP_DIR, outpath);
    const magickCmd = `magick convert '${inpath}' '${outpath}'`;
    console.log(`${magickCmd}\n`, execSync(magickCmd));
    return fs.readFileSync(outpath);
  }
}

module.exports = {
  ImageService,
  TMP_DIR,
};
