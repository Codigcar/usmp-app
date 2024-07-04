import { ICampus, IDatum, ISedeResponse } from '../dtos/sedes.response'

export default class SedeEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: SedeEntityData[],
  ) {}

  static fromJson(json: ISedeResponse) {
    return new SedeEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => SedeEntityData.fromJson(x)),
    )
  }
}

class SedeEntityData {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly address: string,
    readonly phone: string,
    readonly campus: Campus,
  ) {}
  static fromJson(json: IDatum) {
    return new SedeEntityData(
      json['id'],
      json['name'],
      json['address'],
      json['phone'],
      Campus.fromJson(json['campus']),
    )
  }
}

export class Campus {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly createdAt: string,
  ) {}

  static fromJson(json: ICampus) {
    return new Campus(json['id'], json['name'], json['createdAt'])
  }
}
