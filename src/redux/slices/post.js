import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get("/posts")
    return data
})
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const { data } = await axios.get("/tags")
    return data
})

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    },
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = []
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = "rejected"
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
       
    },
})

export const postsReducer = postSlice.reducer
