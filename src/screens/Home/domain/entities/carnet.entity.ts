export default class CarnetEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Datum,
  ) {}

  static fromJson(json: any) {
    return new CarnetEntity(json['success'], json['message'], json['data'])
  }
}

class Datum {
  constructor(
    readonly studentId: number,
    readonly student: Student,
    readonly curriculaId: number,
    readonly facultyId: number,
    readonly schoolId: number,
    readonly valid: number,
    readonly background: Background,
  ) {}

  static fromJson(json: any) {
    return new Datum(
      json['studentId'],
      Student.fromJson(json['student']),
      json['curriculaId'],
      json['facultyId'],
      json['schoolId'],
      json['valid'],
      Background.fromJson(json['background']),
    )
  }
}

class Background {
  constructor(readonly type: string, readonly value: string) {}

  static fromJson(json: any) {
    return new Background(json['type'], json['value'])
  }
}

class Student {
  constructor(
    readonly id: string,
    readonly sapId: string,
    readonly name: string,
    readonly lastName: string,
    readonly email: string,
    readonly phone: string,
    readonly documentType: string,
    readonly documentNumber: string,
    readonly imageUrl: string,
  ) {}

  static fromJson(json: any) {
    return new Student(
      json['id'],
      json['sapId'],
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
