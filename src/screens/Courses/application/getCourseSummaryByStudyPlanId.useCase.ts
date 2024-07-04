import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import CourseDetailEntity from "../domain/entities/courseDetail.entity"
import { ICourseDetailRequest } from "../domain/dtos/courseDetail.request"
import CourseSummaryEntity from "../domain/entities/courseSummary.entity"
import ICoursesRepository from "../domain/repositories/courses.repository"
import CourseRepository from "../infrastructure/repositories/courses.repository.impl"
import { ICourseSummaryRequest } from "../domain/dtos"

class GetCourseSummaryByStudyPlanIdUseCase implements UseCase<ICourseSummaryRequest, Promise<CourseSummaryEntity>>
{
  private repository: ICoursesRepository
  static instance: GetCourseSummaryByStudyPlanIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetCourseSummaryByStudyPlanIdUseCase()
    }
    return this.instance
  }

  constructor(repository: ICoursesRepository = CourseRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICourseSummaryRequest): Promise<CourseSummaryEntity> {
    return await this.repository.getCourseSummaryByStudyPlanId(payload)
  }

}

export default GetCourseSummaryByStudyPlanIdUseCase
