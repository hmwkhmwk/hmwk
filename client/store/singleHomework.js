// import axios from "axios";

// /**
//  * ACTION TYPES
//  */
// const SET_SINGLE_HMWK = "SET_SINGLE_HMWK";

// /**
//  * INITIAL STATE
//  */
// const initialState = {};

// /**
//  * ACTION CREATORS
//  */

// const setSingleHmwk = (singleHmwk) => ({
//   type: SET_SINGLE_HMWK,
//   singleHmwk,
// });

// /**
//  * THUNK CREATORS
//  */

// export const getSingleHmwk = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`/api/hmwks/${id}`);
//       dispatch(setSingleHmwk(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

// /**
//  * REDUCER
//  */

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_SINGLE_HMWK:
//       return action.singleHmwk;
//     default:
//       return state;
//   }
// }
