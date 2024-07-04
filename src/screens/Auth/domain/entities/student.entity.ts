import { ILoginResponse } from "../dtos/login"

export interface IStudent {
  id: number | null
  sapId: string | null
  name: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  documentType: string | null
  documentNumber: string | null
  accessToken: string | null
}

class StudentEntity {
  
  constructor(
    readonly id: number,
    readonly sapId: string,
    readonly name: string,
    readonly lastName: string,
    readonly email: string,
    readonly phone: string,
    readonly documentType: string,
    readonly documentNumber: string,
    readonly userName: string,
    readonly accessToken: string,
    readonly imageUrl: string,
    readonly code: string,
  ) {}

  static fromJson({ data }: ILoginResponse): StudentEntity {
    return new StudentEntity(
      data.student.id,
      data.student.sapId,
      data.student.name,
      data.student.lastName,
      data.student.email,
      data.student.phone,
      data.student.documentType,
      data.student.documentNumber,
      data.username,
      data.accessToken,
      data.student.imageUrl,
      data.student.code,
    )
  }
}

export default StudentEntity
