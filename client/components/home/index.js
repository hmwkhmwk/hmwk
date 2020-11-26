import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { Camera } from "../camera";
import axios from "axios";
// trying to use the "add file" icon
// import { addfile } from "react-icons/antdesign";
// import { FaFileUpload } from "react-icons";

function Home() {
  const hash = useSelector((state) => state.hash);
  // Our camera component only will show when state = true; state will be true upon clicking the upload button
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // We initially don't have a photo taken
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  // sets the photo saved
  const [photo, setPhoto] = useState("");

  const upload = () => {
    setIsCameraOpen(true);
  };

  const cancel = () => {
    setIsCameraOpen(false);
  };

  const savePhoto = async (photo) => {
    try {
      // SAVES THE PHOTO WHEN USER PRESS "TAKE PHOTO OF HMWK"
      setIsPhotoTaken(true);
      setPhoto(photo);
      console.log("Saving the photo");
    } catch (err) {
      console.error(err);
    }
  };

  const submitPhoto = async (photo) => {
    try {
      // SUBMITS THE PHOTO WHEN USER PRESS "SUBMIT"
      const url = window.location.href;
      const token = new URLSearchParams(url.split("?")[1].split("#")[0]).get(
        "token"
      );
      const reqBody = {
        //JSON file including the hash and the image
        token,
        photo,
      };
      console.log("reqBody: ", reqBody);
      console.log("blob is: ", typeof photo);
      const { data } = await axios.post(`/api/submit`, reqBody);
      console.log("Submitting this photo to the back-end", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="home">
      {isCameraOpen ? (
        <div>
          <Camera onCapture={(photo) => savePhoto(photo)} />
          {isPhotoTaken ? (
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
      )}
    </div>
  );
}

export default Home;
