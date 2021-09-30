import React from "react";
import "./Styles/Card.css";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import post, { postThunk } from "../store/post";

function Card(props) {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(props.post.likeCount);
  const [comments, setComments] = useState(props.post.comments.slice(0, 2));
  const [comment, setComment] = useState("");

  return (
    <div className="card">
      <img
        className="image"
        src="https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80"
      />

      <div className="caption">
        <div
          onClick={() => {
            dispatch(
              postThunk({
                variables: { PostId: props.post.id },
                gqlQuery: gql`
                  mutation ($PostId: ID!) {
                    likePost(postId: $PostId) {
                      likeCount
                    }
                  }
                `,
              })
            );
            setLikes(props.post.likeCount + 1);
          }}
        >
          Like : {likes}
        </div>
        <p>
          <b>{props.post.username}</b> &nbsp;
          {props.post.body}
        </p>

        {comments.map((comment) => {
          console.log(comment);
          return (
            <p key={comment.id}>
              <b>{comment.username}</b> &nbsp;{comment.body}{" "}
            </p>
          );
        })}
      </div>
      <div className="comment-box-container">
        <input
          type="text"
          placeholder="Add a comment"
          className="comment-box"
          value={comment}
          onChange={(e) => {
            e.preventDefault();
            setComment(e.target.value);
          }}
        />
        <p
          style={{ padding: "0px 10px 0px 0px" }}
          onClick={() => {
            dispatch(
              postThunk({
                variables: {
                  createCommentPostId: props.post.id,
                  createCommentBody: comment,
                },
                gqlQuery: gql`
                  mutation (
                    $createCommentPostId: ID!
                    $createCommentBody: String!
                  ) {
                    createComment(
                      postId: $createCommentPostId
                      body: $createCommentBody
                    ) {
                      body
                      username
                      createdAt
                    }
                  }
                `,
              })
            );
            setComment("");
            setComments(
              [
                {
                  ...comments[0],
                  body: comment,
                  username: props.post.username,
                  id: new Date().getTime(),
                },
                ...comments,
              ].slice(0, 2)
            );
            console.log(comments);
            //TODO: use the returned comment Object from server
            // setComments(Array.from(comments.unshift(comment)));
            // console.log(comments);
          }}
        >
          post
        </p>
      </div>
    </div>
  );
}

export default Card;
