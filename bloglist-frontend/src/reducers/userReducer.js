import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action) {
      return action.payload
    }
  }
})

export const { userSet } = userSlice.actions

export const userLogin = (userCredentials) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login(userCredentials)
      dispatch(userSet(user))
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user))
      dispatch(setNotification(`${user.username} logged in`))
    }
    catch (error){
      dispatch(setNotification(`${error}`))
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(userSet(user))
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem("loggedInBlogsAppUser")
    dispatch(userSet(initialState))
  }
}

export default userSlice.reducer