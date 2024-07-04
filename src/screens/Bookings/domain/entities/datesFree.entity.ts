import moment from 'moment'
import CDateTime from '../../../../libraries-implementation/dateTime'
import {
  IDatesFreeResponse,
  IDatum,
} from '../dtos/datesFreeByCubicleId.response'

export default class DatesFreeEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: DatesFreeEntityData[],
  ) {}

  static fromJson(json: IDatesFreeResponse) {
    return new DatesFreeEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => DatesFreeEntityData.fromJson(x)),
    )
  }
}

export class DatesFreeEntityData {
  constructor(
    readonly nameDay: string,
    readonly numberDay: number,
    readonly nameMonth: string,
    readonly date: string,
    readonly numberHours: number[],
  ) {}
  static fromJson(json: IDatum) {
    return new DatesFreeEntityData(
      json['nameDay'],
      json['numberDay'],
      json['nameMonth'],
      CDateTime.getInstance().getMetaDataByDay(moment(json['date'])).date,
      json['numberHours'],
    )
  }
}
