import { IAccesoriosResponse, IAccesoriosResponseData } from '../dtos/accesorios.response'

export default class AccesoriosEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: AccesoriosEntityData[],
  ) {}

  static fromJson(json: IAccesoriosResponse) {
    return new AccesoriosEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => AccesoriosEntityData.fromJson(x)),
    )
  }
}

export class AccesoriosEntityData {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
  ) {}
  static fromJson(json: IAccesoriosResponseData) {
    return new AccesoriosEntityData(
      json['id'],
      json['name'],
      json['description'],
    )
  }
}
