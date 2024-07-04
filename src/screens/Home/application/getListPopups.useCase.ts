import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IPopupResponse } from '../domain/dtos/listPopup.response'
import IStudyPlanResponse from '../domain/dtos/listStudyPlan.response'
import PopupEntity from '../domain/entities/popup.entity'
import IHomeRepository from '../domain/repositories/home.repository'
import HomeRepository from '../infrastructure/repositoryies/home.repository.impl'

class GetListPopusUseCase implements UseCase<{}, Promise<PopupEntity>> {
  private repository: IHomeRepository
  static instance: GetListPopusUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListPopusUseCase()
    }
    return this.instance
  }

  constructor(repository: IHomeRepository = HomeRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<PopupEntity> {
    return await this.repository.getListPopups()
  }
}

export default GetListPopusUseCase
