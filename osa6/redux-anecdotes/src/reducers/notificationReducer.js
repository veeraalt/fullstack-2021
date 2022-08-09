import { createSlice } from '@reduxjs/toolkit'

const initialState = ""
let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    dispatch(showNotification(content))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer