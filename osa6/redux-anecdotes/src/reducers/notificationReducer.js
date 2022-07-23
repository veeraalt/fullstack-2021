import { createSlice } from '@reduxjs/toolkit'

const initialState = "test"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
  }
})

export default notificationSlice.reducer