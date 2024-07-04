import ICalendarRequest from "../dtos/calendar.request";
import CalendarEntity from "../entities/calendar.entity";


export default interface ICalendarRepository {
    getCalendarByDate(payload: ICalendarRequest): Promise<CalendarEntity>
}