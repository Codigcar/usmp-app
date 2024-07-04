import { useState } from 'react'
import Toast from 'react-native-toast-message'

import { LoginUseCase } from '../../../application'

const useVerificationInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchVerificationAccess = async (
    username: string,
    password: string,
  ) => {
    setIsLoading(true)
    try {
      const response = await LoginUseCase.getInstance().execute({
        username,
        password,
      })
      if (!response.success) throw new Error(response.message)

      return { status: true }
    } catch (error: any) {
      console.log("🚀 -----------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: Verification.interactor.ts:23 ~ useVerificationInteractor ~ error:", error)
      console.log("🚀 -----------------------------------------------------------------------------------🚀")
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
    fetchVerificationAccess,
    isLoading,
  }
}

export default useVerificationInteractor
