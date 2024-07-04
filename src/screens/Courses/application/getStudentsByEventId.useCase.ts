import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import ICoursesRepository from "../domain/repositories/courses.repository"
import CourseRepository from "../infrastructure/repositories/courses.repository.impl"
import { ICourseStudentsRequest } from "../domain/dtos/courseStudents.request"
import CourseStudentsEntity from "../domain/entities/courseStudents.entity"

class GetStudentsByEventId implements UseCase<ICourseStudentsRequest, Promise<CourseStudentsEntity>>
{
  private repository: ICoursesRepository
  static instance: GetStudentsByEventId

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetStudentsByEventId()
    }
    return this.instance
  }

  constructor(repository: ICoursesRepository = CourseRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICourseStudentsRequest): Promise<CourseStudentsEntity> {
    return await this.repository.getStudentsByEventId(payload)
  }

}

export default GetStudentsByEventId
