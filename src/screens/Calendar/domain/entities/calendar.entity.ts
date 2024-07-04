import ICalendarResponse, { ICalendarResponseData } from '../dtos/calendar.response'

class CalendarEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: CalendarEntityData[],
  ) {}
  static fromJson(json: ICalendarResponse) {
    return new CalendarEntity(
      json['success'],
      json['message'],
      json['data'].map((x) => CalendarEntityData.fromJson(x)),
    )
  }
}

class CalendarEntityData {
  constructor(
    readonly id: string,
    readonly time: string,
    readonly name: string,
    readonly classroom: string,
    readonly section: string,
    readonly description: string,
    readonly status: string,
  ) {}

  static fromJson(json: ICalendarResponseData) {
    return new CalendarEntityData(
      json['id'],
      `${json['startTime']} - ${json['endTime']}`,
      `${json['courseName']}`,
      json['classroomShort'],
      json['section'],
      json['eventTitle'],
      json['status'],
    )
  }
}

export { CalendarEntity, CalendarEntityData }
