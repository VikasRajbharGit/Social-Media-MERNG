import { createSlice } from "@reduxjs/toolkit";

const initialSate = {};

const postSlice = createSlice({
  name: "post",
  initialState: initialSate,
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
    likeUnlikePost(state, action) {},
    comment(state, action) {},
  },
});

export const postAction = postSlice.actions;
export default postSlice.reducer;
