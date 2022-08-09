import {
  GET_LIST,
  GET_LIST_LOADING,
  GET_LIST_ERROR,
} from "../../actionTypes/person.actionType";

export const getPersons = () => async (dispatch) => {
  dispatch({
    type: GET_LIST_LOADING,
  });
  try {
    const data = JSON.parse(localStorage.getItem("persons"));
    dispatch({
      type: GET_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_ERROR,
      payload: error,
    });
  }
};
