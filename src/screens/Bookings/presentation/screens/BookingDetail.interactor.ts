import { useEffect, useState } from 'react'
import GetListMotivosCancelUseCase from '../../application/getMotivosCancel.useCase'
import MotivosCancelEntity, {
  MotivosCancelEntityData,
} from '../../domain/entities/motivosCancel.entity'
import Toast from 'react-native-toast-message'
import CancelReservationsUserCase from '../../application/cancelReservations.useCase'
import { IReservationCancelRequest } from '../../domain/dtos/reservationCancel.request'

const useBookingDetailInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [getMotivosCancel, setGetMotivosCancel] =
    useState<MotivosCancelEntity>()
  const [motivoCancelSelect, setMotivoCancelSelect] =
    useState<MotivosCancelEntityData>()

  const fetchMotivosCancel = async () => {
    try {
      const response = await GetListMotivosCancelUseCase.getInstance().execute()

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const onChangeMotivoCancelSelect = (motivo: MotivosCancelEntityData) => {
    setMotivoCancelSelect(motivo)
  }

  const fetchCancelReservations = async (
    payload: IReservationCancelRequest,
  ) => {
    try {
      const response = await CancelReservationsUserCase.getInstance().execute(
        payload,
      )

      if (!response.success) throw new Error(response.message)
      return { status: true, data: response }
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
      return { status: false }
    }
  }

  const init = async () => {
    setIsLoading(true)
    const getMotivos = await fetchMotivosCancel()
    if (!getMotivos.status) return
    setGetMotivosCancel(getMotivos.data)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    getMotivosCancel,
    isLoading,
    onChangeMotivoCancelSelect,
    motivoCancelSelect,
    fetchCancelReservations,
  }
}

export default useBookingDetailInteractor
