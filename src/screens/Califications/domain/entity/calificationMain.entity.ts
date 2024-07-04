import {
  ICalificationsMainResponse,
  ICoursesGrade,
  IData,
} from '../dtos/calificationMain.response'

export default class CalificationMainEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: IData,
  ) {}

  static fromJson(json: ICalificationsMainResponse) {
    return new CalificationMainEntity(
      json['success'],
      json['message'],
      DataEntity.fromJson(json['data']),
    )
  }
}

class DataEntity {
  constructor(
    readonly generalAvergae: string,
    readonly periodAverage: string,
    readonly periodCredits: string,
    readonly coursesGrades: ICoursesGrade[],
  ) {}

  static fromJson(json: IData) {
    return new DataEntity(
      json['generalAvergae'],
      json['periodAverage'],
      json['periodCredits'],
      json['coursesGrades'].map((x) => CoursesGradeEntity.fromJson(x)),
    )
  }
}

class CoursesGradeEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly abreviation: string,
    readonly status: string,
    readonly credits: string,
    readonly averageGrade: string,
  ) {}

  static fromJson(json: ICoursesGrade) {
    return new CoursesGradeEntity(
      json['id'],
      json['name'],
      json['abreviation'],
      json['status'],
      json['credits'],
      json['averageGrade'],
    )
  }
}
