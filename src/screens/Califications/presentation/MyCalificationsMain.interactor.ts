import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import SearchPeriodsByPlanStudy from '../application/searchPeriodByPlanStudy'
import { useStudyPlan } from '../../../context'
import { IPeriod } from '../domain/dtos/calificationPeriods.response'
import CalificationMainEntity from '../domain/entity/calificationMain.entity'
import GetCalificationsByPeriodIdUseCase from '../application/getCalificationsByPeriodId.useCase'
import { ICalificationMainRequest } from '../domain/dtos/calificationMain.request'

const useMyCalificationsMainInteractor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [periods, setPeriods] = useState<IPeriod[]>()
  const [califications, setCalifications] = useState<CalificationMainEntity>()
  const [valueDropdown, setValueDropdown] = useState<any>()
  
  const { studyPlanSelect } = useStudyPlan()
  
  const onChangeValueDropdown = (item: any) => {
    setValueDropdown(item)
  }

  const fetchPeriods = async () => {
    if (!studyPlanSelect) return

    try {
      const getPeriods = await SearchPeriodsByPlanStudy.getInstance().execute(studyPlanSelect.name)
      return { status: true, response: getPeriods.periods }
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

  const fetchListCalifications = async (payload: ICalificationMainRequest) => {
    if (!studyPlanSelect) return

    try {

      const getPeriods = await GetCalificationsByPeriodIdUseCase.getInstance().execute(payload)
      return { status: true, response: getPeriods }

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
    const getPeriods = await fetchPeriods()
    
    const periodId = valueDropdown ? valueDropdown : getPeriods?.response?.[0].id  
    const getCalifications = await fetchListCalifications({periodId})

    setIsLoading(false)
    setPeriods(getPeriods?.response)
    setCalifications(getCalifications?.response)
   if(!valueDropdown) setValueDropdown(getPeriods?.response?.[0].id)
  }
  
  useEffect(() => {
    init()
  }, [studyPlanSelect, valueDropdown])
  

  return {
    isLoading,
    periods,
    califications,
    onChangeValueDropdown,
    valueDropdown
  }
}

export default useMyCalificationsMainInteractor
