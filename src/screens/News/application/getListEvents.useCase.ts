import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import NewEntity from '../domain/entities/news.entity'
import INewsRepository from '../domain/repositories/news.repository'
import NewsRepository from '../infrastructure/repositories/news.repository.impl'


class GetListEventsUseCase implements UseCase<{}, Promise<NewEntity>> {
  private repository: INewsRepository
  static instance: GetListEventsUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListEventsUseCase()
    }
    return this.instance
  }

  constructor(repository: INewsRepository = NewsRepository.getInstance()) {
    this.repository = repository
  }

  // public async execute(): Promise<EventEntity> {
  public async execute(): Promise<NewEntity> {
    // return await this.repository.getListEvents()
    return await this.repository.getListEvents2()
  }
}

export default GetListEventsUseCase
