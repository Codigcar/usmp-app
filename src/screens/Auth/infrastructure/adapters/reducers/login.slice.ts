import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/login.thunk'
import { STATUS } from '../../../../../libraries-implementation/redux/redux.types'

type IState = {
  login: any
  status: STATUS
  isLoading: boolean
  error: any
}

const initialState: IState = {
  login: null,
  status: 'initial',
  isLoading: false,
  error: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.login = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.isLoading = false
      })
  },
})

export default loginSlice
