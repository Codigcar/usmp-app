import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { ICarnetRequest } from '../domain/dtos/listCarnet.request'
import IStudyPlanResponse from '../domain/dtos/listStudyPlan.response'
import CarnetEntity from '../domain/entities/carnet.entity'
import IHomeRepository from '../domain/repositories/home.repository'
import HomeRepository from '../infrastructure/repositoryies/home.repository.impl'

class GetCarnetByStudyPlanIdUseCase implements UseCase<{}, Promise<CarnetEntity>> {
  private repository: IHomeRepository
  static instance: GetCarnetByStudyPlanIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetCarnetByStudyPlanIdUseCase()
    }
    return this.instance
  }

  constructor(repository: IHomeRepository = HomeRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: ICarnetRequest): Promise<CarnetEntity> {
    return await this.repository.getCarnetByStudyPlanId(payload)
  }
}

export default GetCarnetByStudyPlanIdUseCase
