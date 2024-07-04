import HttpClient from '../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../libraries-implementation/http/http.interface'
import ICalendarRequest from '../domain/dtos/calendar.request'
import ICalendarResponse from '../domain/dtos/calendar.response'
import { CalendarEntity } from '../domain/entities/calendar.entity'
import ICalendarRepository from '../domain/repository/calendar.repository'

class CalendarRepository implements ICalendarRepository {
  private http: IHttpClient
  static instance: CalendarRepository

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CalendarRepository()
    }
    return this.instance
  }

  public async getCalendarByDate(
    payload: ICalendarRequest,
  ): Promise<CalendarEntity> {
    const resp = await this.http.get<ICalendarResponse>(`/calendar?curriculaId=${payload.studyPlanId}&startAt=${payload.startAt}&endAt=${payload.endAt}`)
    const entity = CalendarEntity.fromJson(resp)
    return entity
  }
}

export default CalendarRepository
