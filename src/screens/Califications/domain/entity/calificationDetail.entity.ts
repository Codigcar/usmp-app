import {
  ICalificationDetailResponse,
  IData,
  IFinalAverage,
} from '../dtos/calificationDetail.response'

export default class CalificationDetailEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum,
  ) {}
  static fromJson(json: ICalificationDetailResponse) {
    return new CalificationDetailEntity(
      json['success'],
      json['message'],
      Datum.fromJson(json['data']),
    )
  }
}

class Datum {
  constructor(
    readonly finalAverage: FinalAverage,
    readonly partialExams: FinalAverage[],
  ) {}

  static fromJson(json: IData) {
    return new Datum(
      FinalAverage.fromJson(json['finalAverage']),
      Array.from(json['partialExams']).map((x) => FinalAverage.fromJson(x)),
    )
  }
}

class FinalAverage {
  constructor(
    readonly id: string,
    readonly weighing: string,
    readonly name: string,
    readonly qualification: string,
    readonly confirmation: string,
  ) {}

  static fromJson(json: IFinalAverage) {
    return new FinalAverage(
      json['id'],
      `${Math.round(Number(json['weighing']))}%`,
      json['name'],
      json['qualification'] === "" ? '0' : json['qualification'],
      json['confirmation'],
    )
  }
}
