import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IDatesFreeRequest } from '../domain/dtos/datesFreeByCubicleId.request'
import DatesFreeEntity from '../domain/entities/datesFree.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListDatesFreeByCubicleIdUseCase implements UseCase<IDatesFreeRequest, Promise<DatesFreeEntity>> {
  private repository: IBookingsRepository
  static instance: GetListDatesFreeByCubicleIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListDatesFreeByCubicleIdUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: IDatesFreeRequest): Promise<DatesFreeEntity> {
    const getData = this.repository.getListDatesFreeByCubicleId(payload)
    return getData
  }
}

export default GetListDatesFreeByCubicleIdUseCase
