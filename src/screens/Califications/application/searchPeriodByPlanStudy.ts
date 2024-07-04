import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IDatum } from '../domain/dtos/calificationPeriods.response'
import ICalificationsRepository from '../domain/repository/califications.repository'
import CalificationsRepository from '../infrastructure/repository/califications.repository.impl'

class SearchPeriodsByPlanStudy implements UseCase<{}, Promise<IDatum>> {
  private repository: ICalificationsRepository
  static instance: SearchPeriodsByPlanStudy

  static getInstance() {
    if (!this.instance) {
      this.instance = new SearchPeriodsByPlanStudy()
    }
    return this.instance
  }

  constructor(
    repository: ICalificationsRepository = CalificationsRepository.getInstance(),
  ) {
    this.repository = repository
  }
  public async execute(studyPlanName: string): Promise<IDatum> {
    const { data } = await this.repository.getAllPeriods()
    const periodsByStudyPlanName = data.filter(item => item.name === studyPlanName)[0]
    return periodsByStudyPlanName
  }
}

export default SearchPeriodsByPlanStudy
