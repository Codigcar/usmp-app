import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import ICalendarRequest from "../domain/dtos/calendar.request"
import CalendarEntity from "../domain/entities/calendar.entity"
import ICalendaRepository from "../domain/repository/calendar.repository"
import CalendarRepository from "../infrastructure/calendar.repository.impl"

class GetCalendar implements UseCase<ICalendarRequest, Promise<CalendarEntity>>
{
  private repository: ICalendaRepository
  static instance: GetCalendar

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetCalendar()
    }
    return this.instance
  }

  constructor(repository: ICalendaRepository = CalendarRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICalendarRequest): Promise<CalendarEntity> {
    return await this.repository.getCalendarByDate(payload)
  }

}

export default GetCalendar
