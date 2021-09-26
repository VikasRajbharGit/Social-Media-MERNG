import React, { useState, useEffect } from "react";
import "./Styles/Nav.css";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/auth";

function Nav() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(localStorage.getItem("token").token);
  useEffect(() => {
    console.log(auth.session > new Date());
    if (auth.token != "NA" && auth.session > new Date()) {
      history.push("./");
    } else {
      history.push("./login");
    }
  }, [auth.token]);
  return (
    <div className="nav">
      <h4>home</h4>
      <h4>search</h4>
      <h4>Profile</h4>
      <h4
        onClick={() => {
          console.log("hello");
          history.push("./login");
          dispatch(authActions.logout());
        }}
      >
        Logout
      </h4>
    </div>
  );
}

export default Nav;
