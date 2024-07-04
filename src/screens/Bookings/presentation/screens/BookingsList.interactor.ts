import { useEffect, useState } from 'react'
import GetListReservation from '../../application/getReservations.useCase'
import ReservationListEntity from '../../domain/entities/reservationList.entity'
import Toast from 'react-native-toast-message'
import CancelReservationsUserCase from '../../application/cancelReservations.useCase'
import { IReservationCancelRequest } from '../../domain/dtos/reservationCancel.request'

const useBookingsListInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [getReservationsList, setGetReservationsList] = useState<ReservationListEntity>()

  const fetchReservations = async () => {
    try {
      const response = await GetListReservation.getInstance().execute()

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
    const getReversation = await fetchReservations()
    if(!getReversation.status) return
    setGetReservationsList(getReversation.data)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    isLoading,
    getReservationsList,
  }
}

export default useBookingsListInteractor
