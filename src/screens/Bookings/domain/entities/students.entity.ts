import { IStudentsResponse, IStudentsResponseData } from '../dtos/students.response'

export default class StudentsEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: StudentsEntityData[],
  ) {}

  static fromJson(json: IStudentsResponse) {
    return new StudentsEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => StudentsEntityData.fromJson(x)),
    )
  }
}

export class StudentsEntityData {
  constructor(
    readonly id: number,
    readonly sapId: string,
    readonly code: string,
    readonly name: string,
    readonly lastName: string,
    readonly email: string,
    readonly phone: string,
    readonly documentType: string,
    readonly documentNumber: string,
    readonly imageUrl: string,
  ) {}
  static fromJson(json: IStudentsResponseData) {
    return new StudentsEntityData(
      json['id'],
      json['sapId'],
      json['code'],
      json['name'],
      json['lastName'],
      json['email'],
      json['phone'],
      json['documentType'],
      json['documentNumber'],
      json['imageUrl'],
    )
  }
}
