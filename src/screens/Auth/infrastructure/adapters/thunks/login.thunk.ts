import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginUseCase } from '../../../application'
import { ILoginRequest } from '../../../domain/dtos/login'

export const fetchUsers = createAsyncThunk('auth/loginUseCase', async (payload: ILoginRequest) => {
  const response = await LoginUseCase.getInstance().execute(payload)
  return response
})
