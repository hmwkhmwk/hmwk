import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "../camera";
import axios from "axios";
import { useHistory } from "react-router-dom";

// trying to use the "add file" icon
// import { addfile } from "react-icons/antdesign";
// import { FaFileUpload } from "react-icons";

function Home() {
  const hash = useSelector((state) => state.hash);
  const history = useHistory();

  // Our camera component only will show when state = true; state will be true upon clicking the upload button
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // Set the photo saved. Initially we don't have a photo taken.
  const [photo, setPhoto] = useState(null);

  const upload = () => {
    setIsCameraOpen(true);
  };

  const cancel = () => {
    setIsCameraOpen(false);
  };

  // savePhoto converts the a photo blob to a string
  // and saves it to the "photo" React state variable.
  async function savePhoto(blob) {
    try {
      setPhoto(blob);
    } catch (error) {
      console.error(err);
    }
  }

  // submitPhoto will take the photoBlob from savePhoto(...) and the token from the URL
  // and send it to the back-end
  const submitPhoto = async (photo) => {
    try {
      // Get the token from the URL.
      const url = window.location.href;
      const token = new URLSearchParams(url.split("?")[1].split("#")[0]).get(
        "token"
      );

      // Create a "fake" form.
      // https://stackoverflow.com/a/47630754/859840
      const formData = new FormData();
      formData.append("token", token);
      formData.append(
        "photo",
        photo,
        `${hash.hmwkTitle} - ${hash.studentName}.png`
      );
      for (var [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("formData:");
      console.log(JSON.stringify(formData));
      const { data } = await axios.post("/api/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("/api/submit resp.data:", data);
      history.push("/review");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="home">
      {isCameraOpen ? (
        <div>
          <Camera onCapture={(blob) => savePhoto(blob)} />
          {photo ? (
            <button className="buttonCTA" onClick={() => submitPhoto(photo)}>
              Submit
            </button>
          ) : (
            ""
          )}

          <button className="buttonCTA" onClick={() => cancel()}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="headerSubtitle">
            <h1>{hash.hmwkTitle}</h1>
          </div>
          <div className="deadline">
            <h3> Due on {hash.dueDate} </h3>
          </div>
          <div className="sticker">
            <img
              className="sticker"
              src="./stickers/hmwk_success.png"
              alt="Upload Sticker"
            />{" "}
          </div>

          {hash.file === "" ? (
            <div>
              <div className="greeting">
                <h2>
                  {" "}
                  Hi {hash.studentName}, are you ready to submit your homework?{" "}
                </h2>
              </div>
              <button
                type="button"
                className="submitButton"
                onClick={() => upload()}
              >
                Upload
              </button>
            </div>
          ) : (
            <div>
              <div className="greeting">
                <h2>
                  {" "}
                  Hi {hash.studentName}, do you want to resubmit your homework?{" "}
                </h2>
              </div>
              <button
                type="button"
                className="submitButton"
                onClick={() => upload()}
              >
                Resubmit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
