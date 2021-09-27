import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import gql from "graphql-tag";

import "./Styles/Login.css";

import { postThunk } from "../store/post";

function AddPost() {
  const post = useSelector((state) => state);
  const history = useHistory();
  const [body, setBody] = useState("");

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
            placeholder="Write down something..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <input
            type="submit"
            className="button"
            value="Post"
            onClick={(e) => {
              e.preventDefault();

              dispatch(
                postThunk({
                  variables: {
                    createPostBody: body,
                  },
                  gqlQuery: gql`
                    mutation ($createPostBody: String!) {
                      createPost(body: $createPostBody) {
                        body
                        username
                        createdAt
                        id
                      }
                    }
                  `,
                })
              );
              setBody("");
              history.push("/");
            }}
          />
          {/* {auth.messages.error && <p>{auth.messages.error}</p>} */}
        </form>
      </div>
    </div>
  );
}

export default AddPost;
