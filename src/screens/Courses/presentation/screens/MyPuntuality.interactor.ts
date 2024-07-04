import { useEffect, useState } from 'react'
import GetPuntualityInfoByEventIdUseCase from '../../application/getPuntualityInfoByEventId.useCase'
import { IPuntualityRequest } from '../../domain/dtos/puntuality.request'
import Toast from 'react-native-toast-message'
import PuntualityEntity from '../../domain/entities/puntuality.entity'

const usePuntualityInteractor = (eventId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [puntualityInfo, setPuntualityInfo] = useState<PuntualityEntity>()

  const fetchPuntualityInfo = async (payload: IPuntualityRequest) => {
    setIsLoading(true)
    try {
      const resp = await GetPuntualityInfoByEventIdUseCase.getInstance().execute(payload)
      return resp
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const init = async() => {
    const resp = await fetchPuntualityInfo({ eventId })
    setPuntualityInfo(resp)
  }

  useEffect(() => {
    init()
  }, [eventId])

  return {
    isLoading,
    puntualityInfo
  }
}

export default usePuntualityInteractor
