import {
  IEventInfo,
  IEventsResponse,
  IEventsResponseData,
} from '../dtos/events.response'

export default class EventEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum,
  ) {}

  static fromJson(json: IEventsResponse) {
    return new EventEntity(json['success'], json['message'], json['data'])
  }
}

class Datum {
  constructor(
    readonly featured: EventInfoEntity[],
    readonly events: EventInfoEntity[],
    readonly totalPages: number,
  ) {}
  static fromJson(json: IEventsResponseData) {
    return new Datum(
      Array.from(json['featured']).map((x) => EventInfoEntity.fromJson(x)),
      Array.from(json['events']).map((x) => EventInfoEntity.fromJson(x)),
      json['totalPages'],
    )
  }
}

export class EventInfoEntity {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly backgroundColor: string | null,
    readonly backgroundImage: string | null,
    readonly modality: number | null,
    readonly currency: string | null,
    readonly address: string | null,
    readonly date: string,
    readonly typeId: number,
    readonly type: string | null,
    readonly cost: number | null,
    readonly urlLink: string | null,
    readonly capacity: number | null,
    readonly featured: boolean,
    readonly audienceType: string,
    readonly audiences: any[],
    readonly startAt: string,
    readonly endAt: string,
  ) {}

  static fromJson(json: IEventInfo) {
    return new EventInfoEntity(
      json['id'],
      json['title'],
      json['description'],
      json['backgroundColor'],
      json['backgroundImage'],
      json['modality'],
      json['currency'],
      json['address'],
      json['date'],
      json['typeId'],
      json['type'],
      json['cost'],
      json['urlLink'],
      json['capacity'],
      json['featured'],
      json['audienceType'],
      json['audiences'],
      json['startAt'],
      json['endAt'],
    )
  }
}
