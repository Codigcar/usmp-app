import { IHoursFreeResponseData, IHoursFreeResponse } from "../dtos/hoursFree.response"

export default class HoursFreeEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: HoursFreeEntityData[],
  ) {}

  static fromJson(json: IHoursFreeResponse) {
    return new HoursFreeEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => HoursFreeEntityData.fromJson(x)),
    )
  }
}

export class HoursFreeEntityData {
  constructor(
    readonly id: number,
    readonly numberHours: number,
    readonly startAt: string,
    readonly endAt: string,
    readonly active: boolean
  ) {}
  static fromJson(json: IHoursFreeResponseData) {
    return new HoursFreeEntityData(
      json['id'],
      json['numberHours'],
      json['startAt'],
      json['endAt'],
      json['active'],
    )
  }
}
