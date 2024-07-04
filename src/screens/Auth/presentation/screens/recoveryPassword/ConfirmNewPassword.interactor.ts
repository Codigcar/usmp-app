import { useState } from 'react'
import { RecoveryPasswordSetNewPasswordUseCase } from '../../../application'
import Toast from 'react-native-toast-message'
import { ISetNewPasswordRequest } from '../../../domain/dtos/recoveryPassword/setNewPassword/setNewPassword.request'

const useConfirmNewPasswordInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchSetNewPassword = async(payload: ISetNewPasswordRequest) => {
    setIsLoading(true)
    try {
      const response =
        await RecoveryPasswordSetNewPasswordUseCase.getInstance().execute(payload)
      if (!response.success) throw new Error(response.message)

      return { status: true }
    } catch (error: any) {
      console.log("🚀 -----------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: ConfirmNewPassword.interactor.ts:18 ~ fetchSetNewPassword ~ error:", error)
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
    fetchSetNewPassword,
    isLoading,
  }
}

export default useConfirmNewPasswordInteractor