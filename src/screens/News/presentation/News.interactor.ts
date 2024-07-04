import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import NewEntity from '../domain/entities/news.entity'
import GetListNewsUseCase, {
  INewsRequest,
} from '../application/getListNews.useCase'

const useNewsInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tabSelect, setTabSelect] = useState(0)
  const [newsList, setNewsList] = useState<NewEntity>()

  const fetchNewsList = async (payload: INewsRequest) => {
    try {
      const response = await GetListNewsUseCase.getInstance().execute(payload)
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

    if (tabSelect === 0) {
      // Noticias
      const getNews = await fetchNewsList({ type: 'NOTICIAS' })
      setNewsList(getNews.data)
    }
    if (tabSelect === 1) {
      // Eventos
      const getEvents = await fetchNewsList({ type: 'EVENTOS' })
      setNewsList(getEvents.data)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [tabSelect])

  return {
    isLoading,
    newsList,
    tabSelect,
    onChangeTabSelect,
  }
}

export default useNewsInteractor
