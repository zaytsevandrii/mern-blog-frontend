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
export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => axios.delete(`/posts/${id}`))

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
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = "rejected"
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
        [fetchTags.fulfilled]: (state) => {
            state.tags.items = []
            state.tags.status = "rejected"
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items=state.posts.items.filter(obj=>obj._id!==action.meta.arg)
        },
    
       
    },
})

export const postsReducer = postSlice.reducer
