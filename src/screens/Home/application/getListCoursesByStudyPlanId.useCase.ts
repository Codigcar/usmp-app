import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import IListCoursesByStudyPlanIdResponse from '../domain/dtos/listCoursesByStudyPlanId.response'
import IStudyPlanResponse from '../domain/dtos/listStudyPlan.response'
import IHomeRepository from '../domain/repositories/home.repository'
import HomeRepository from '../infrastructure/repositoryies/home.repository.impl'

class GetListCoursesByStudyPlanIdUseCase implements UseCase<{}, Promise<IListCoursesByStudyPlanIdResponse>> {
  private repository: IHomeRepository
  static instance: GetListCoursesByStudyPlanIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListCoursesByStudyPlanIdUseCase()
    }
    return this.instance
  }

  constructor(repository: IHomeRepository = HomeRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(planId: string): Promise<IListCoursesByStudyPlanIdResponse> {
    return await this.repository.listCoursesByStudyPlanId(planId)
  }
}

export default GetListCoursesByStudyPlanIdUseCase
