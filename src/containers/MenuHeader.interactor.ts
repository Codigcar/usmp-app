import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import GetListStudyPlanUseCase from '../screens/Home/application/getListStudyPlan.useCase'

const useMenuInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchListStudyPlan = async () => {
    setIsLoading(true)
    try {
      const response = await GetListStudyPlanUseCase.getInstance().execute()
      if (!response.success) throw new Error(response.message)

      return { status: true, data: response.data }
    } catch (error: any) {
      console.log("🚀 --------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: MenuHeader.interactor.ts:16 ~ fetchListStudyPlan ~ error:", error)
      console.log("🚀 --------------------------------------------------------------------------🚀")
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
    fetchListStudyPlan,
    isLoading,
  }
}

export default useMenuInteractor
