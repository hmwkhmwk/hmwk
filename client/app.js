import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getHmwkTrackingDataThunk } from "./store/hash";
import { HeaderAllHmwks, Header, Footer } from "./components";
import Routes from "./routes";

const App = () => {
  const url = window.location.href;
  const token = new URLSearchParams(url.split("?")[1].split("#")[0]).get(
    "token"
  );

  const dispatch = useDispatch();
  const loadHmwkTrackingData = () => {
    dispatch(getHmwkTrackingDataThunk(token));
  };

  useEffect(() => {
    loadHmwkTrackingData(token);
  }, []);

  return (
    <div>
      <Header />
      <Routes />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
