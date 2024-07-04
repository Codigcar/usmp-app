import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import useRecoveryPasswordInteractor from './RecoveryPassword.interactor'
import { IValidateCodeRequest } from '../../../domain/dtos/recoveryPassword/validateCode/validatecode.request'
import { RecoveryPasswordValidateCodeUseCase } from '../../../application'
import { TextInput } from 'react-native'

const SECONDS_INITIAL = 3

const useCodeOTPInteractor = () => {
  const [segundos, setSegundos] = useState(SECONDS_INITIAL)
  const [isLoading, setIsLoading] = useState(false)
  const { fetchSendCodeOTP } = useRecoveryPasswordInteractor()

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (segundos > 0) {
        setSegundos(segundos - 1)
      }
    }, 1000)

    return () => clearInterval(intervalo)
  }, [segundos])

  const minutos = Math.floor(segundos / 60)
  const segundosRestantes = segundos % 60

  const resetTime = () => {
    setSegundos(SECONDS_INITIAL)
  }

  const fetchRetrySendCodeOTP = async (email: string) => {
    if (segundos !== 0) {
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'Aún no es posible reenviar otro código OTP',
      })
      return false
    }
    setIsLoading(true)
    const { status } = await fetchSendCodeOTP(email)
    setIsLoading(false)
    return status
  }

  const encryptEmail = (email: string) => {
    const splitEmail = email.split('@')
    const userEmail = splitEmail[0]
    const domainEmail = splitEmail[1]

    const primeraLetra = userEmail.charAt(0)
    const ultimaLetra = userEmail.charAt(userEmail.length - 1)

    const nombreOculto =
      primeraLetra + '*'.repeat(userEmail.length - 2) + ultimaLetra

    return nombreOculto + '@' + domainEmail
  }

  const fetchValidateCode = async (email: string, code: string) => {
    setIsLoading(true)
    try {
      const response =
        await RecoveryPasswordValidateCodeUseCase.getInstance().execute({
          email,
          code,
        })
      if (!response.success) throw new Error(response.message)

      return { status: true }
    } catch (error: any) {
      console.log("🚀 ----------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: CodeOTP.interactor.ts:73 ~ fetchValidateCode ~ error:", error)
      console.log("🚀 ----------------------------------------------------------------------🚀")
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

  const nextInputRef = (nextInputRef: React.RefObject<TextInput>) => {
    nextInputRef?.current?.focus()
  }

  return {
    minutos,
    segundosRestantes,
    fetchRetrySendCodeOTP,
    encryptEmail,
    isLoading,
    resetTime,
    fetchValidateCode,
    nextInputRef
  }
}

export default useCodeOTPInteractor
