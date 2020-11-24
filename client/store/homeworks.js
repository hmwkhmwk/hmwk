// import axios from "axios";

// /**
//  * ACTION TYPES
//  */
// const GET_HMKWS = "GET_HMKWS";

// /**
//  * INITIAL STATE
//  */
// const initialState = [];

// /**
//  * ACTION CREATORS
//  */

// const setAllHmwks = (hmwks) => ({
//   type: GET_HMKWS,
//   hmwks,
// });

// /**
//  * THUNK CREATORS
//  */

// export const getAllHmwks = () => async (dispatch) => {
//   try {
//     const res = await axios.get("/api/hmwks");
//     dispatch(setAllHmwks(res.data));
//   } catch (err) {
//     console.error(err);
//   }
// };

// /**
//  * REDUCER
//  */

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case GET_HMKWS:
//       return action.hmwks;
//     default:
//       return state;
//   }
// }
