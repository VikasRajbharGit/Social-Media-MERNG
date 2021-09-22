import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import Card from "./Card";
import "./Styles/Home.css";
import "./Followers";
import Followers from "./Followers";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);

  return (
    <div className="home">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          {data.getPosts.map((post) => {
            return <Card key={post.id} post={post} />;
          })}
        </div>
      )}
      <div className="side-panel">
        <Followers />
      </div>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;
