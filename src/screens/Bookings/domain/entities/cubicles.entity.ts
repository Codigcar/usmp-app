import { ICubiclesResponse, ICubiclesResponseData } from "../dtos/cubicules.response"

export default class CubiclesEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: CubiclesEntityData[],
  ) {}

  static fromJson(json: ICubiclesResponse) {
    return new CubiclesEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => CubiclesEntityData.fromJson(x)),
    )
  }
}

export class CubiclesEntityData {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly capacity: number,
    readonly color: string,
    readonly active: boolean,
  ) {}
  static fromJson(json: ICubiclesResponseData) {
    return new CubiclesEntityData(
        json['id'],
        json['name'],
        json['capacity'],
        json['color'],
        json['active'],
    )
  }
}
