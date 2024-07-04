import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import CalificationDetailEntity from "../domain/entity/calificationDetail.entity"
import { ICalificationDetailRequest } from "../domain/dtos/calificationDetail.request"
import ICalificationsRepository from "../domain/repository/califications.repository"
import CalificationsRepository from "../infrastructure/repository/califications.repository.impl"

class GetCalificationsByCourseIdUseCase implements UseCase<ICalificationDetailRequest, Promise<CalificationDetailEntity>>
{
  private repository: ICalificationsRepository
  static instance: GetCalificationsByCourseIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetCalificationsByCourseIdUseCase()
    }
    return this.instance
  }

  constructor(repository: ICalificationsRepository = CalificationsRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICalificationDetailRequest): Promise<CalificationDetailEntity> {
    return await this.repository.getCalificationByCourseId(payload)
  }

}

export default GetCalificationsByCourseIdUseCase
