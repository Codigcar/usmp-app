import { ICourseSummaryResponse, IData } from "../dtos/courseSummary.response"

class CourseSummaryEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: Data,
  ) {}

  static fromJson(json: ICourseSummaryResponse) {
    return new CourseSummaryEntity(
      json['success'],
      json['message'],
      Data.fromJson(json['data']),
    )
  }
}

class Data {
  constructor(
    readonly tutoringCount: number,
    readonly materialCount: number,
    readonly nonAssistenceCount: number,
    readonly classmatesCount: number,
  ) {}

  static fromJson(json: IData) {
    return new Data(
      json['classmatesCount'],
      json['materialCount'],
      json['nonAssistenceCount'],
      json['classmatesCount'],
    )
  }
}

export default CourseSummaryEntity
