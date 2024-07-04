import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IListHomeRequest } from '../domain/dtos/listHome.request'
import HomeEntity from '../domain/entities/home.entity'
import IHomeRepository from '../domain/repositories/home.repository'
import HomeRepository from '../infrastructure/repositoryies/home.repository.impl'

class GetListHomeUseCase implements UseCase<IListHomeRequest, Promise<HomeEntity>> {
  private repository: IHomeRepository
  static instance: GetListHomeUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListHomeUseCase()
    }
    return this.instance
  }

  constructor(repository: IHomeRepository = HomeRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: IListHomeRequest): Promise<HomeEntity> {
    return await this.repository.getHome(payload)
  }
}

export default GetListHomeUseCase
