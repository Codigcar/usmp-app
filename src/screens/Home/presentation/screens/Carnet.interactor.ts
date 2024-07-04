import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import GetCarnetByStudyPlanIdUseCase from '../../application/getCarnetByStudyPlanId.useCase'
import CarnetEntity from '../../domain/entities/carnet.entity'
import { ICarnetRequest } from '../../domain/dtos/listCarnet.request'
import { useStudyPlan } from '../../../../context'

const useCarnetInteractor = () => {
  const { studyPlanSelect } = useStudyPlan()

  const [isLoading, setIsLoading] = useState(false)
  const [carnet, setCarnet] = useState<CarnetEntity>()

  const fetchCarnet = async (payload: ICarnetRequest) => {
    setIsLoading(true)
    try {
      const response = await GetCarnetByStudyPlanIdUseCase.getInstance().execute(payload)
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

  const init = async () => {
    const resp = await fetchCarnet({ studyPlanId: String(studyPlanSelect?.id) })
    setCarnet(resp.data)
  }

  useEffect(() => {
    init()
  }, [studyPlanSelect])

  return {
    isLoading,
    carnet
  }
}

export default useCarnetInteractor
