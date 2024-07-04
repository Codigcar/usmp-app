import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import IStudyPlanResponse from '../domain/dtos/listStudyPlan.response'
import IHomeRepository from '../domain/repositories/home.repository'
import HomeRepository from '../infrastructure/repositoryies/home.repository.impl'

class GetListStudyPlanUseCase implements UseCase<{}, Promise<IStudyPlanResponse>> {
  private repository: IHomeRepository
  static instance: GetListStudyPlanUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListStudyPlanUseCase()
    }
    return this.instance
  }

  constructor(repository: IHomeRepository = HomeRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<IStudyPlanResponse> {
    return await this.repository.listStudyPlan()
  }
}

export default GetListStudyPlanUseCase
