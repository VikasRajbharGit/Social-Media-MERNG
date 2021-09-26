import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import "./Styles/Login.css";

import { login } from "../store/auth";

function Login() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(auth);
  const dispatch = useDispatch();

  return (
    <div className="main">
      <div>
        <img
          className="image"
          src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"
        />
      </div>
      <div>
        <form className="form">
          <img
            className="logo"
            src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="button"
            value="Log In"
            onClick={(e) => {
              e.preventDefault();

              dispatch(
                login({
                  username: username,
                  password: password,
                })
              );
            }}
          />
          {auth.messages.error && <p>{auth.messages.error}</p>}
          <hr style={{ width: "268px" }} />
          <p>OR</p>
          <button
            type="button"
            className="button"
            onClick={() => {
              history.push("./register");
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
