import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import CDateTime from '../../../../libraries-implementation/dateTime'
import { ICourseDetailRequest } from '../../domain/dtos/courseDetail.request'
import GetEventbyCourseUseCase from '../../application/getEventByCourse.useCase'
import CourseDetailEntity from '../../domain/entities/courseDetail.entity'
import { useStudyPlan } from '../../../../context'
import GetCourseSummaryByStudyPlanIdUseCase from '../../application/getCourseSummaryByStudyPlanId.useCase'
import CourseSummaryEntity from '../../domain/entities/courseSummary.entity'
import { ICourseSummaryRequest } from '../../domain/dtos'

type Iday = {
  name: string
  date: string
}

const MOCK_INIT = {
  success: true,
  message: '',
  data: {
    tutoringCount: 0,
    materialCount: 0,
    nonAssistenceCount: 0,
    classmatesCount: 0,
  },
}

const useMyCourseDetailInteractor = () => {
  const { courseSelect, eventByCourseSelect, studyPlanSelect } = useStudyPlan()
  const [isLoading, setIsLoading] = useState(false)
  const [chronogramInfo, setChronogramInfo] = useState<CourseDetailEntity>()
  const [valueDropdown, setValueDropdown] = useState(eventByCourseSelect?.id)
  const [summaryInfo, setSummaryInfo] = useState<CourseSummaryEntity>(MOCK_INIT)
  const getWeekDays = CDateTime.getInstance().getWeekDays()

  const [daySelect, setDaySelect] = useState<Iday>(getWeekDays[0])

  const fetchChronogamByEventId = async (payload: ICourseDetailRequest) => {
    setIsLoading(true)
    try {
      const resp = await GetEventbyCourseUseCase.getInstance().execute(payload)
      return resp
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSummaryByStudyPlanId = async (payload: ICourseSummaryRequest) => {
    setIsLoading(true)
    try {
      const resp =
        await GetCourseSummaryByStudyPlanIdUseCase.getInstance().execute(
          payload,
        )
      return resp
    } catch (error: any) {
      const messageError = String(error?.message).startsWith('Request')
        ? error?.response?.data?.message
        : error?.message

      Toast.show({
        type: 'error',
        text2: messageError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onChangeDaySelect = (item: Iday) => {
    setDaySelect(item)
  }

  const onChangeValueDropdown = (item: any) => {
    setValueDropdown(item)
  }

  const fetchInit = async () => {
    const data = await fetchChronogamByEventId({
      eventId: valueDropdown!,
      startAt: daySelect!.date,
      endAt: daySelect!.date,
    })
    setChronogramInfo(data)
  }

  const fetchInitSummary = async () => {
    const data = await fetchSummaryByStudyPlanId({
      planStudyId: String(studyPlanSelect?.id!),
    })
    if (!data) return
    setSummaryInfo(data)
  }

  useEffect(() => {
    fetchInit()
  }, [daySelect, valueDropdown])

  useEffect(() => {
    fetchInitSummary()
  }, [])

  return {
    getWeekDays,
    fetchChronogamByEventId,
    isLoading,
    courseSelect,
    daySelect,
    onChangeDaySelect,
    chronogramInfo,
    valueDropdown,
    onChangeValueDropdown,
    eventByCourseSelect,
    fetchSummaryByStudyPlanId,
    summaryInfo,
  }
}

export default useMyCourseDetailInteractor
