import { useState } from 'react'

import { RecoveryPasswordSendEmailUseCase } from '../../../application'
import Toast from 'react-native-toast-message'

const useRecoveryPasswordInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

 
  const fetchSendCodeOTP = async (email: string) => {
    setIsLoading(true)
    try {
      const response = await RecoveryPasswordSendEmailUseCase.getInstance().execute({ email })
      if(!response.success) throw new Error(response.message);
      
      Toast.show({
        type: 'success',
        text1: 'Código enviado',
        text2: 'Hemos enviado su código al correo institucional',
      })
      return { status: true}
    } catch (error:any) {
      const messageError = String(error?.message).startsWith('Request') ? error?.response?.data?.message: error?.message  
      
      Toast.show({
          type: 'error',
          text2: messageError
      })
      return { status: false}
    } finally {
        setIsLoading(false)
    }
    
  }

  return {
    isLoading,
    fetchSendCodeOTP,
  }
}

export default useRecoveryPasswordInteractor
