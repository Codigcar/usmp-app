import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { ICalificationMainRequest } from "../domain/dtos/calificationMain.request"
import ICalificationsRepository from "../domain/repository/califications.repository"
import CalificationsRepository from "../infrastructure/repository/califications.repository.impl"
import CalificationMainEntity from "../domain/entity/calificationMain.entity"

class GetCalificationsByPeriodIdUseCase implements UseCase<ICalificationMainRequest, Promise<CalificationMainEntity>>
{
  private repository: ICalificationsRepository
  static instance: GetCalificationsByPeriodIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetCalificationsByPeriodIdUseCase()
    }
    return this.instance
  }

  constructor(repository: ICalificationsRepository = CalificationsRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ICalificationMainRequest): Promise<CalificationMainEntity> {
    return await this.repository.getCalificationsByPeriodId(payload)
  }

}

export default GetCalificationsByPeriodIdUseCase
