import { useEffect, useState } from 'react'
import CDateTime, { IDay } from '../../../libraries-implementation/dateTime'
import GetCalendar from '../application/getCalendar'
import ICalendarRequest from '../domain/dtos/calendar.request'
import Toast from 'react-native-toast-message'
import { useStudyPlan } from '../../../context'
import { IStatusTimeCourse } from '../../../components/time/types'
import { CalendarEntity } from '../domain/entities/calendar.entity'

const useCalendarInteractor = () => {
  const getWeekDays = CDateTime.getInstance().getWeekDays()
  const { studyPlanSelect } = useStudyPlan()

  const [daySelect, setDaySelect] = useState<IDay>(getWeekDays[0])
  const [isLoading, setIsLoading] = useState(false)
  const [getDatesList, setGetDatesList] = useState<CalendarEntity>()

  const onChangeDaySelect = (item: IDay) => {
    setDaySelect(item)
  }

  const fetchCalendar = async (payload: ICalendarRequest) => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const init = async () => {
    if (!studyPlanSelect) return
    const getDates = await fetchCalendar({
      studyPlanId: String(studyPlanSelect.id),
      startAt: daySelect.date,
      endAt: daySelect.date,
    })
    if (!getDates) return
    setGetDatesList(getDates)
  }

  useEffect(() => {
    init()
  }, [daySelect])

  return { getWeekDays, daySelect, onChangeDaySelect, getDatesList, isLoading }
}
export default useCalendarInteractor
