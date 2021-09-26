import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import "./Styles/Login.css";

import { registerUser } from "../store/auth";

function Login() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  //   console.log(auth);
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
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            className="button"
            value="Sign Up"
            onClick={(e) => {
              e.preventDefault();

              dispatch(
                registerUser({
                  username: username,
                  email: email,
                  password: password,
                  confirmPassword: confirmPassword,
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
              history.push("./login");
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
