import { CalendarEntityData } from '../../../Calendar/domain/entities/calendar.entity'
import { NewInfoEntity } from '../../../News/domain/entities/news.entity'
import {
  IHomeResponse,
  IHomeResponseData,
  IPayment,
} from '../dtos/listHome.response'

export default class HomeEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: HomeDataEntity,
  ) {}

  static fromJson(json: IHomeResponse) {
    return new HomeEntity(
      json['success'],
      json['message'],
      HomeDataEntity.fromJson(json['data']),
    )
  }
}

class HomeDataEntity {
  constructor(
    readonly schedules: CalendarEntityData[],
    readonly payments: PaymentHomeEntity,
    readonly events: NewInfoEntity[],
  ) {}

  static fromJson(json: IHomeResponseData) {
    return new HomeDataEntity(
      Array.from(json['schedules']).map((x) => CalendarEntityData.fromJson(x)),
      PaymentHomeEntity.fromJson(json['payments']),
      Array.from(json['events']).map((x) => NewInfoEntity.fromJson(x)),
    )
  }
}

class PaymentHomeEntity {
  constructor(
    readonly paymentsCount: number,
    readonly paymentsDate: string,
    readonly paymentsAmount: number,
  ) {}

  static fromJson(json: IPayment) {
    return new PaymentHomeEntity(
      json['paymentsCount'],
      json['paymentsDate'],
      json['paymentsAmount'],
    )
  }
}
