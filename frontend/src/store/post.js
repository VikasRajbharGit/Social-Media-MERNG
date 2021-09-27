import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";

import { client } from "../ApolloProvider";

const postThunk = createAsyncThunk(
  "post/generic",
  async (payload, thunkAPI) => {
    try {
      const data = await client.mutate({
        mutation: payload.gqlQuery,
        variables: payload.variables,
      });

      return data;
    } catch (err) {
      console.log(err);
      return { error: err.message };
    }
  }
);

const initialSate = {};

const postSlice = createSlice({
  name: "post",
  initialState: initialSate,
  reducers: {
    updatePost(state, action) {},
    // likeUnlikePost(state, action) {},
    comment(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(postThunk.fulfilled, (state, action) => {
      console.log("post operation");
    });
  },
});

export const postAction = postSlice.actions;
export { postThunk };
export default postSlice.reducer;
