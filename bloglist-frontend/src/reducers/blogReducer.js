import { createSlice } from "@reduxjs/toolkit"

import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const initialState = []

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addNewBlog(state, action){
      return [...state, action.payload]
    }
  }
})

export const { setBlogs, addNewBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
    catch(error) {
      dispatch(setNotification(error, true))
    }
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch(addNewBlog(response))
    dispatch(setNotification(`A new blog "${response.title}" by ${response.author} added`))
  }
}

export default blogSlice.reducer