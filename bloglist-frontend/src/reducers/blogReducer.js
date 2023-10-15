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
    addNewBlog(state, action) {
      return [...state, action.payload]
    },
    blogUpdate(state, action){
      return state.map(blog => blog.id !== action.payload.id ? blog: action.payload)
    }
  },
})

export const { setBlogs, addNewBlog, blogUpdate } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      dispatch(setNotification(error, true))
    }
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch(addNewBlog(response))
    dispatch(
      setNotification(
        `A new blog "${response.title}" by ${response.author} added`
      )
    )
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(blog)
      const updatedBlog = { ...response, id: blog.id }
      dispatch(blogUpdate(updatedBlog))
      dispatch(setNotification(
        `You liked ${updatedBlog.title} blog by ${updatedBlog.author}`
      ))
    }
    catch (error) {
      dispatch(
        setNotification(`${error}`)
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification("Blog deleted"))
      dispatch(initializeBlogs())
    }
    catch (error) {
      dispatch(
        setNotification(`${error}`)
      )
    }
  }
}

export default blogSlice.reducer
