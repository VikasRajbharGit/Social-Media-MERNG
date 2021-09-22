import React from "react";
import "./Styles/Card.css";

function Card(props) {
  return (
    <div className="card">
      <img
        className="image"
        src="https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80"
      />

      <div className="caption">
        <p>
          <b>{props.post.username}</b> &nbsp;
          {props.post.body}
        </p>

        {props.post.comments.map((comment) => {
          console.log(comment);
          return (
            <span key={comment.id}>
              <b>{comment.username}</b> & nbsp;{comment.body}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
