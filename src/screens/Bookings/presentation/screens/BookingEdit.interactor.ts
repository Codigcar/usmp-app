import { useState } from 'react'
import UpdateReservationUseCase from '../../application/updateReservation.useCase'
import { IUpdateReservationRequest } from '../../domain/dtos/reservationUpdate.request'
import Toast from 'react-native-toast-message'

const useBookingEditInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showModalConfirmation, setShowModalConfirmation] = useState(false)

  const fetchUpdateReservation = async ({
    reservationId,
    payload,
  }: {
    reservationId: string
    payload: IUpdateReservationRequest
  }) => {
    setIsLoading(true)
    try {
      const response = await UpdateReservationUseCase.getInstance().execute({
        reservationId,
        payload,
      })

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
    } finally {
      setIsLoading(false)
    }
  }

  const onToggleModal = () => {
    setShowModalConfirmation(!showModalConfirmation)
  }

  return {
    fetchUpdateReservation,
    isLoading,
    onToggleModal,
    showModalConfirmation
  }
}

export default useBookingEditInteractor
