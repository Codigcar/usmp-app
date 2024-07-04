import { useRef, useState } from 'react'
import Toast from 'react-native-toast-message'

import { IPaymentsRequest } from '../domain/dtos/payments.request'
import GetPaymentsByPlanStudyIdUseCase from '../application/getPaymentsByPlanStudyId.useCase'
import PaymentsEntity, {
  PaymentsEntityData,
} from '../domain/entity/payments.entity'

const usePaymentsInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPEN, setIsPEN] = useState(true)
  const [payments, setPayments] = useState<PaymentsEntityData[]>()
  const [listToPay, setListToPay] = useState<PaymentsEntityData[]>([])
  const manageData = useRef<PaymentsEntity>()

  const addListToPay = (itemNew: PaymentsEntityData) => {
    if (listToPay.includes(itemNew)) {
      const getListFilter = listToPay.filter((item) => item !== itemNew)
      setListToPay(getListFilter)
      return
    }
    setListToPay((prev) => [...prev, itemNew])
  }

  const fetchGetPayments = async (payload: IPaymentsRequest) => {
    setIsLoading(true)
    try {
      const getFullData =
        await GetPaymentsByPlanStudyIdUseCase.getInstance().execute(payload)
      return { status: true, response: getFullData }
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

  const filterByPensions = () => {
    const getPayments = manageData.current?.data.filter(
      (item) =>
        item.type === 'P' &&
        (isPEN ? item.currency === 'PEN' : item.currency === 'USD'),
    )
    setPayments(getPayments)
  }

  const filterByServices = () => {
    const getServices = manageData.current?.data.filter(
      (item) =>
        item.type === 'S' &&
        (isPEN ? item.currency === 'PEN' : item.currency === 'USD'),
    )
    setPayments(getServices)
  }

  const onChangeCurrency = () => {
    setIsPEN(!isPEN)
  }

  const resetListToPay = () => {
    setListToPay([])
  }

  const init = async (studyPlanId: string) => {
    const getFullData = await fetchGetPayments({ studyPlanId })
    if (!getFullData.response) return
    manageData.current = getFullData.response
    filterByPensions()
  }

  return {
    isLoading,
    payments,
    addListToPay,
    listToPay,
    init,
    filterByPensions,
    filterByServices,
    isPEN,
    onChangeCurrency,
    resetListToPay,
  }
}

export default usePaymentsInteractor
