// import axios from "axios";

// /**
//  * ACTION TYPES
//  */
// const GET_SINGLE_STUDENT = "GET_SINGLE_STUDENT";

// /**
//  * INITIAL STATE
//  */
// const initialState = [];

// /**
//  * ACTION CREATORS
//  */

// const setSingleStudent = (student) => ({
//   type: GET_SINGLE_STUDENT,
//   student,
// });

// /**
//  * THUNK CREATORS
//  */

// export const getSingleStudent = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get("/api/students/:id");
//     dispatch(setSingleStudent(data));
//   } catch (err) {
//     console.error(err);
//   }
// };

// /**
//  * REDUCER
//  */

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case GET_SINGLE_STUDENT:
//       return action.student;
//     default:
//       return state;
//   }
// }
