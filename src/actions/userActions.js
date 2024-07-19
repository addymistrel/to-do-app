import React from "react";
import axios from "axios";

export const fetchUserData = (token) => async (dispatch) => {
  const data = {
    username: token,
  };
  const response = await axios
    .post("/retriveLoginDetails", { data })
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
    })
    .catch((err) => console.log(err));
};
