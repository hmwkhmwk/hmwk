import React, { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { Home, Upload, Review, SingleHmwk, AllHmwks } from "./components";
import { useSelector, useDispatch } from "react-redux";

/**
 * COMPONENT
 */

const Routes = () => {
  return (
    <Switch>
      <Route path="/allHmwks" component={AllHmwks} />
      <Route path="/singleHmwk" component={SingleHmwk} />
      <Route exact path="/review" component={Review} />
      <Route path="/upload" component={Upload} />

      <Route component={Home} />
    </Switch>
  );
};

export default withRouter(Routes);
