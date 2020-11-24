import axios from "axios";

/**
 * ACTION TYPES
 */
const SET_HMWK_TRACKING_DATA = "SET_HMWK_TRACKING_DATA";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

const setHmwkTrackingData = (hash) => ({
  type: SET_HMWK_TRACKING_DATA,
  hash,
});

/**
 * THUNK CREATORS
 */

export const getHmwkTrackingDataThunk = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/hash/${token}`);
    dispatch(setHmwkTrackingData(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_HMWK_TRACKING_DATA:
      return action.hash;
    default:
      return state;
  }
}
