import moment from 'moment'
import {
  INewsInfo,
  INewsResponse,
  INewsResponseData,
} from '../dtos/news.response'

export default class NewEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: NewEntityData,
  ) {}

  static fromJson(json: INewsResponse) {
    return new NewEntity(json['success'], json['message'], NewEntityData.fromJson(json['data']))
  }
}

export class NewEntityData {
  constructor(
    readonly featured: NewInfoEntity[],
    readonly news: NewInfoEntity[],
    readonly totalPages: number,
  ) {}
  static fromJson(json: INewsResponseData) {
    return new NewEntityData(
      Array.from(json['featured']).map((x) => NewInfoEntity.fromJson(x)),
      Array.from(json['news'] ?? json['events']).map((x) => NewInfoEntity.fromJson(x)),
      10101001,
    )
  }
}

export class NewInfoEntity {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly summary: string,//
    readonly description: string,
    readonly subtitle: string,//
    readonly backgroundColor: string,
    readonly backgroundImage: string,
    readonly featured: boolean,
    readonly categoryId: number,//
    readonly category: string,//
    readonly audienceType: string,
    readonly startAt: string,
    readonly endAt: string,
    readonly priority: number,//
    readonly urlLink: string,

    // readonly id: string,
    // readonly title: string,
    // readonly description: string,
    // readonly backgroundColor: string,
    // readonly backgroundImage: string,
    readonly modality: string,
    readonly currency: string,
    readonly address: string,
    readonly date: string,
    readonly typeId: string,
    readonly type: string,
    readonly cost: string,
    // readonly urlLink: string,
    readonly capacity: string,
    // readonly featured: string,
    // readonly audienceType: string,
    readonly audiences: any[],
    readonly monthsAgo: string,
    // readonly startAt: string,
    // readonly endAt: string,
  ) {}

  static fromJson(json: INewsInfo) {
    return new NewInfoEntity(
      json['id'],
      json['title'],
      json['summary'] ?? '',
      json['description'],
      json['subtitle'] ?? 'No info',
      json['backgroundColor'],
      json['backgroundImage'],
      json['featured'],
      json['categoryId'] ?? 1,
      json['category'] ?? '',
      json['audienceType'],
      json['startAt'],
      json['endAt'],
      json['priority'] ?? 1,
      json['urlLink'],

      json['modality'],
      json['currency'],
      json['address'] ?? 'No info',
      json['date'],
      json['typeId'],
      json['type'] ?? '',
      json['cost'],
      json['capacity'],
      json['audiences'],
      `Hace ${String(
        moment().diff(moment(json['date']), 'months'),
      )} meses`
    )
  }
}
