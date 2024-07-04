import {
  ICalificationPeriodsResponse,
  IDatum,
  IPeriod,
} from '../dtos/calificationPeriods.response'

export default class CalificationPeriodsEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum[],
  ) {}
  
  static fromJson(json: ICalificationPeriodsResponse) {
    return new CalificationPeriodsEntity(
      json['success'],
      json['message'],
      json['data'].map((x) => Datum.fromJson(x)),
    )
  }
}

class Datum {
  constructor(readonly name: string, readonly periods: Period[]) {}

  static fromJson(json: IDatum) {
    return new Datum(
      json.name,
      json.periods.map((x) => Period.fromJson(x)),
    )
  }
}

class Period {
  constructor(
    readonly id: number,
    readonly code: string,
    readonly year: string,
    readonly yearName: string,
    readonly period: string,
    readonly periodName: string,
    readonly fullPeriod: string
  ) {}

  static fromJson(json: IPeriod) {
    return new Period(
      json.id,
      json.code,
      json.year,
      json.yearName,
      json.period,
      json.periodName,
      `Año ${json.year} - ${json.periodName}`
    )
  }
}
