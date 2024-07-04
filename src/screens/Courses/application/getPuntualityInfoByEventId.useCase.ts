import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IPuntualityRequest } from "../domain/dtos/puntuality.request"
import ICoursesRepository from "../domain/repositories/courses.repository"
import CourseRepository from "../infrastructure/repositories/courses.repository.impl"
import PuntualityEntity from "../domain/entities/puntuality.entity"

class GetPuntualityInfoByEventIdUseCase implements UseCase<IPuntualityRequest, Promise<PuntualityEntity>>
{
  private repository: ICoursesRepository
  static instance: GetPuntualityInfoByEventIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetPuntualityInfoByEventIdUseCase()
    }
    return this.instance
  }

  constructor(repository: ICoursesRepository = CourseRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IPuntualityRequest): Promise<PuntualityEntity> {
    return await this.repository.getPuntualityByEventId(payload)
  }

}

export default GetPuntualityInfoByEventIdUseCase
