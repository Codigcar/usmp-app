export default interface ICalendarResponse {
  success: boolean
  message: string
  data: ICalendarResponseData[]
}

export interface ICalendarResponseData {
  id: string
  date: string
  startTime: string
  endTime: string
  classroom: string
  section: string
  courseName: string
  eventTitle: string
  status: string
  classroomShort: string
}

export type Status = 'finished' | 'inProcess' | 'open'
