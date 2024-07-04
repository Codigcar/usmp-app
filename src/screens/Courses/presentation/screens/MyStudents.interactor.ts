import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import GetStudentsByEventId from '../../application/getStudentsByEventId.useCase'
import { ICourseStudentsRequest } from '../../domain/dtos/courseStudents.request'
import CourseStudentsEntity from '../../domain/entities/courseStudents.entity'

const useCourseStudentsInteractor = ({ eventId }: { eventId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [studentList, setStudentList] = useState<CourseStudentsEntity>()

  const fetchListStudents = async (payload: ICourseStudentsRequest) => {
    setIsLoading(true)
    try {
      const resp = await GetStudentsByEventId.getInstance().execute(payload)
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
    const resp = await fetchListStudents({ eventId })
    setStudentList(resp)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    isLoading,
    studentList,
  }
}

export default useCourseStudentsInteractor
