export default class PopupEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum[],
  ) {}

  static fromJson(json: any) {
    return new PopupEntity(json['success'], json['message'], json['data'])
  }
}

class Datum {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly summary: string,
    readonly subtitle: string,
    readonly urlLink: string,
    readonly backgroundColor: string,
    readonly backgroundImage: string,
    readonly startAt: string,
    readonly endAt: string,
    readonly section: string,
    readonly sectionId: string,
  ) {}
  static fromJson(json: any) {
    return new Datum(
      json['id'],
      json['title'],
      json['summary'],
      json['subtitle'],
      json['urlLink'],
      json['backgroundColor'],
      json['backgroundImage'],
      json['startAt'],
      json['endAt'],
      json['section'],
      json['sectionId'],
    )
  }
}
