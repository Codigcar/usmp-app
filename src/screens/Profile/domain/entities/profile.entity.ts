import { IData, IDepartment, IProfileResponse } from '../dtos/profile.response'

export default class ProfileEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: ProfileEntityData,
  ) {}
  static fromJson(json: IProfileResponse) {
    return new ProfileEntity(json['success'], json['message'], json['data'])
  }
}

export class ProfileEntityData {
  constructor(
    readonly imageUrl: string,
    readonly name: string,
    readonly lastName: string,
    readonly code: string,
    readonly personalEmail: string,
    readonly phone: string,
    readonly district: DepartamentEntity,
    readonly province: DepartamentEntity,
    readonly department: DepartamentEntity,
    readonly address: string,
  ) {}

  static fromJson(json: IData) {
    return new ProfileEntityData(
      json['imageUrl'],
      json['name'],
      json['lastName'],
      json['code'],
      json['personalEmail'],
      json['phone'],
      json['district'],
      json['province'],
      json['department'],
      json['address'],
    )
  }
}

export class DepartamentEntity {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly country: string,
    readonly code: string,
  ) {}

  static fromJson(json: IDepartment) {
    return new DepartamentEntity(
      json['id'],
      json['name'],
      json['country'],
      json['code'],
    )
  }
}
