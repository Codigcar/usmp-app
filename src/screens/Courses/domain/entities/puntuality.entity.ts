import {
  IDataPuntuality,
  INonAttendance,
  IPuntualityResponse,
} from '../dtos/puntuality.response'

export default class PuntualityEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Data,
  ) {}
  static fromJson(json: IPuntualityResponse) {
    return new PuntualityEntity(json['success'], json['message'], json['data'])
  }
}

class Data {
  constructor(
    readonly nonAttendancesHours: number,
    readonly nonAttendancesHoursPercentage: number,
    readonly attendancesHours: number,
    readonly attendancesHoursPercentage: number,
    readonly totalHours: number,
    readonly totalHoursPercentage: number,
    readonly nonAttendances: NonAttendance[],
  ) {}
  static fromJson(json: IDataPuntuality) {
    return new Data(
      json['nonAttendancesHours'],
      json['nonAttendancesHoursPercentage'],
      json['attendancesHours'],
      json['attendancesHoursPercentage'],
      json['totalHours'],
      json['totalHoursPercentage'],
      json['nonAttendances'].map((x) => NonAttendance.fromJson(x)),
    )
  }
}

class NonAttendance {
  constructor(
    readonly id: number,
    readonly day: string,
    readonly date: string,
    readonly startAt: string,
    readonly endAt: string,
    readonly reason: string,
  ) {}
  static fromJson(json: INonAttendance) {
    return new NonAttendance(
      json['id'],
      json['day'],
      json['date'],
      json['startAt'],
      json['endAt'],
      json['reason'],
    )
  }
}
