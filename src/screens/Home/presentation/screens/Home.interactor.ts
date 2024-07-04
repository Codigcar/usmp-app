import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import GetListCoursesByStudyPlanIdUseCase from '../../application/getListCoursesByStudyPlanId.useCase'
import { ICourseByStudyPlanIdResponseData } from '../../domain/dtos/listCoursesByStudyPlanId.response'
import { useStudyPlan } from '../../../../context'
import CDateTime from '../../../../libraries-implementation/dateTime'
import GetCalendar from '../../../Calendar/application/getCalendar'
import ICalendarRequest from '../../../Calendar/domain/dtos/calendar.request'
import { CalendarEntity } from '../../../Calendar/domain/entities/calendar.entity'
import GetListPopusUseCase from '../../application/getListPopups.useCase'
import PopupEntity from '../../domain/entities/popup.entity'
import { IListHomeRequest } from '../../domain/dtos/listHome.request'
import GetListHomeUseCase from '../../application/getListHome.useCase'
import HomeEntity from '../../domain/entities/home.entity'

const useHomeInteractor = () => {
  const { studyPlanSelect, setterCourseList } = useStudyPlan()
  const [isLoading, setIsLoading] = useState(false)
  const [coursesList, setCoursesList] = useState<ICourseByStudyPlanIdResponseData[]>([])
  const [calendarList, setCalendarList] = useState<CalendarEntity>()
  const [popupsList, setPopupsList] = useState<PopupEntity>()
  const [getHome, setGetHome] = useState<HomeEntity>()
  const getWeekDays = CDateTime.getInstance().getWeekDays()

  const fetchListCoursesByStudyPlanId = async (planId: string) => {
    try {
      const response =
        await GetListCoursesByStudyPlanIdUseCase.getInstance().execute(planId)
      if (!response.success) throw new Error(response.message)
      setterCourseList(response.data)
      return { status: true, data: response.data }
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

  const fetchListCalendar = async (payload: ICalendarRequest) => {
    try {
      const resp = await GetCalendar.getInstance().execute(payload)
      return resp
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
    } 
  }

  const fetchListPopups = async () => {
    setIsLoading(true)
    try {
      const response = await GetListPopusUseCase.getInstance().execute()
      if (!response.success) throw new Error(response.message)
        setPopupsList(response)
      return { status: true, data: response.data }
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

  const fetchHome = async (payload: IListHomeRequest) => {
    try {
      const resp = await GetListHomeUseCase.getInstance().execute(payload)
      return resp
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
    }
  }

  const init = async () => {
    setIsLoading(true)
    if (!studyPlanSelect) return
    // fetchListCoursesByStudyPlanId(String(studyPlanSelect.id)).then(
    //   ({ status, data }) => {
    //     if (!status) return
    //     setCoursesList(data ?? [])
    //   },
    // )
    const getListCourses = await fetchListCoursesByStudyPlanId(String(studyPlanSelect.id))
    if(!getListCourses.status) return
    setCoursesList(getListCourses.data ?? [])

    const getCalendarList = await fetchListCalendar({
      studyPlanId: String(studyPlanSelect.id),
      startAt: getWeekDays[0].date,
      endAt: getWeekDays[0].date,
    })
    setCalendarList(getCalendarList)

    await fetchListPopups()

    const getListHome = await fetchHome({curriculaId: String(studyPlanSelect.id)})
    setGetHome(getListHome)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [studyPlanSelect])

  return {
    isLoading,
    fetchListCoursesByStudyPlanId,
    coursesList,
    calendarList,
    popupsList,
    getHome
  }
}

export default useHomeInteractor
