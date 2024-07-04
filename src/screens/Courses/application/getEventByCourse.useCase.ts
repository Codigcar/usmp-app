import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import CourseDetailEntity from "../domain/entities/courseDetail.entity"
import { ICourseDetailRequest } from "../domain/dtos/courseDetail.request"
import ICoursesRepository from "../domain/repositories/courses.repository"
import CourseRepository from "../infrastructure/repositories/courses.repository.impl"

class GetEventbyCourseUseCase implements UseCase<ICourseDetailRequest, Promise<CourseDetailEntity>>
{
  private repository: ICoursesRepository
  static instance: GetEventbyCourseUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetEventbyCourseUseCase()
    }
    return this.instance
  }

  constructor(repository: ICoursesRepository = CourseRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICourseDetailRequest): Promise<CourseDetailEntity> {
    return await this.repository.eventsByCourse(payload)
  }

}

export default GetEventbyCourseUseCase
