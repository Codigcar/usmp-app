import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import NewEntity from '../domain/entities/news.entity'
import INewsRepository from '../domain/repositories/news.repository'
import NewsRepository from '../infrastructure/repositories/news.repository.impl'

export type INewsRequest = {
  type: 'EVENTOS' | 'NOTICIAS'
}

class GetListNewsUseCase implements UseCase<INewsRequest, Promise<NewEntity>> {
  private repository: INewsRepository
  static instance: GetListNewsUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListNewsUseCase()
    }
    return this.instance
  }

  constructor(repository: INewsRepository = NewsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute({ type }: INewsRequest): Promise<NewEntity> {
    let getData
    if (type === 'EVENTOS') {
      getData = await this.repository.getListEvents2()
    }
    if (type === 'NOTICIAS') {
      getData = await this.repository.getListNews()
    }
    return getData!
  }
}

export default GetListNewsUseCase
