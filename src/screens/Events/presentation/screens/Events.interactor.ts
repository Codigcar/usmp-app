import { useEffect, useState } from 'react'
import GetListEventsUseCase from '../../../News/application/getListEvents.useCase'
import Toast from 'react-native-toast-message'
import EventEntity from '../../../News/domain/entities/events.entity'

const useEventsInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tabSelect, setTabSelect] = useState(0)
  const [eventsList, setEventsList] = useState<EventEntity>()

  const fetchEventsList = async () => {
    try {
      const response = await GetListEventsUseCase.getInstance().execute()
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

  const onChangeTabSelect = (index: number) => {
    setTabSelect(index)
  }

  const init = async () => {
    setIsLoading(true)
    const getEvents = await fetchEventsList()
    // setEventsList(getEvents.data)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    isLoading,
    tabSelect,
    onChangeTabSelect,
    eventsList
  }
}

export default useEventsInteractor
