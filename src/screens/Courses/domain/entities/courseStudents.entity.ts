import {
  ICourseStudentsResponse,
  IDataStudent,
} from '../dtos/courseStudents.response'

export default class CourseStudentsEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: DataCourseStudent[],
  ) {}

  static fromJson(json: ICourseStudentsResponse) {
    return new CourseStudentsEntity(
      json['success'],
      json['message'],
      json['data'].map((x) => DataCourseStudent.fromJson(x)),
    )
  }
}

class DataCourseStudent {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly imageUrl: string,
  ) {}

  static fromJson(json: IDataStudent) {
    return new DataCourseStudent(
      json['id'],
      json['name'],
      json['email'],
      json['imageUrl'],
    )
  }
}
