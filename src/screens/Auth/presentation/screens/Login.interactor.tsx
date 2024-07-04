import { useState } from 'react'
import Toast from 'react-native-toast-message'

import { ILoginRequest } from '../../domain/dtos/login'
import { LoginUseCase } from '../../application'
import { useAuth } from '../../../../context/auth.provider'

const useLoginInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()


  const fetchLogin = async (payload: ILoginRequest) => {
    setIsLoading(true)
    try {
      const response = await LoginUseCase.getInstance().execute(payload)
      if (!response.success) throw new Error(response.message)

      signIn(response.data)
      return { status: true }
    } catch (error: any) {
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
    fetchLogin,
    isLoading,
  }
}

export default useLoginInteractor
