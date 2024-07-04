import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { ChangePasswordUseCase } from '../../../application'
import { IChangePasswordRequest } from '../../../domain/dtos/changePassword/changePassword.request'

const useChangePasswordInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchChangePassword = async (payload:IChangePasswordRequest) => {
    setIsLoading(true)
    try {
      const response = await ChangePasswordUseCase.getInstance().execute(payload)
      if (!response.success) throw new Error(response.message)

      return { status: true }
    } catch (error: any) {
      console.log("🚀 -------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: ChangePassword.interactor.ts:17 ~ fetchChangePassword ~ error:", error)
      console.log("🚀 -------------------------------------------------------------------------------🚀")
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    fetchChangePassword,
    isLoading,
  }
}

export default useChangePasswordInteractor
