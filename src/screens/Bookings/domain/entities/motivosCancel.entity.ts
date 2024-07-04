import { IMotivosCancelReponseData, IMotivosCancelResponse } from '../dtos/reservationCancelMotivos.response'

export default class MotivosCancelEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: MotivosCancelEntityData[],
  ) {}

  static fromJson(json: IMotivosCancelResponse) {
    return new MotivosCancelEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => MotivosCancelEntityData.fromJson(x)),
    )
  }
}

export class MotivosCancelEntityData {
  constructor(
    readonly id: number,
    readonly reason: string,
  ) {}
  static fromJson(json: IMotivosCancelReponseData) {
    return new MotivosCancelEntityData(
      json['id'],
      json['reason'],
    )
  }
}
