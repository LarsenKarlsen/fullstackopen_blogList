import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: "", show: false, error: false }

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { message: action.payload, show: true, error: false }
    },
    // eslint-disable-next-line no-unused-vars
    hideNotification(state, action) {
      return initialState
    },
    showErrorNotification(state, action) {
      return { message: action.payload, show: true, error: true }
    },
  },
})

export const { showNotification, hideNotification, showErrorNotification } =
  notificationSlice.actions

export const setNotification = (message, error=false, time=5000) => {
  return async (dispatch) => {
    if (!error) {
      dispatch(showNotification(message))
    } else {
      dispatch(showErrorNotification(message))
    }
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export default notificationSlice.reducer