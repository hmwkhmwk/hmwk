import React, { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { Home, Upload, Review, SingleHmwk, AllHmwks } from "./components";
import { useSelector, useDispatch } from "react-redux";

/**
 * COMPONENT
 */

const Routes = () => {
  // const isLoggedIn = useSelector(state => !!state.user.id)
  // const dispatch = useDispatch()
  // const loadInitialData = () => {
  //   dispatch(me())
  // }

  // useEffect(() => {
  //   loadInitialData()
  // })

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

// import { connect } from "react-redux";
// import { withRouter, Route, Switch } from "react-router-dom";
// import PropTypes from "prop-types";
// // import { Login, Signup, UserHome } from "./components";
// import { me } from "./store";

// /**
//  * COMPONENT
//  */
// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData();
//   }

//   render() {
//     const { isLoggedIn } = this.props;

//     return (
//       <Switch>
//         {/* Routes placed here are available to all visitors */}
//         <Route path="/login" component={Login} />
//         <Route path="/signup" component={Signup} />
//         {isLoggedIn && (
//           <Switch>
//             {/* Routes placed here are only available after logging in */}
//             <Route path="/home" component={UserHome} />
//           </Switch>
//         )}
//         {/* Displays our Login component as a fallback */}
//         <Route component={Login} />
//       </Switch>
//     );
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
