import {
  IPaymentsResponse,
  IPaymentsResponseData,
} from '../dtos/payments.response'

export default class PaymentsEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: PaymentsEntityData[],
  ) {}
  static fromJson(json: IPaymentsResponse) {
    return new PaymentsEntity(
      json['success'],
      json['message'],
      json['data'].map((x) => PaymentsEntityData.fromJson(x)),
    )
  }
}

export class PaymentsEntityData {
  constructor(
    readonly id: string,
    readonly code: string,
    readonly type: string,
    readonly description: string,
    readonly period: string,
    readonly expiredAt: string,
    readonly lateAmount: string,
    readonly amount: string,
    readonly currency: string,
    readonly total: string,
    readonly statuses: string,
    readonly moneyType: string,
    readonly statusesName: string,
  ) {}

  static fromJson(json: IPaymentsResponseData) {
    return new PaymentsEntityData(
      json['id'],
      json['code'],
      json['type'],
      json['description'],
      json['period'],
      json['expiredAt'],
      json['lateAmount'],
      json['amount'],
      json['currency'],
      json['total'],
      json['status'],
      json['currency'] === "PEN" ? 'S/' : '$',
      json['status'] === "expired" ? 'Vencido' : 'Vencimiento',
    )
  }
}
