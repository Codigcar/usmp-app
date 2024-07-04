import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import SedeEntity from '../domain/entities/sedes.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListSedesUseCase implements UseCase<{}, Promise<SedeEntity>> {
  private repository: IBookingsRepository
  static instance: GetListSedesUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListSedesUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<SedeEntity> {
    const getData = this.repository.getListSedes()
    return getData
  }
}

export default GetListSedesUseCase
