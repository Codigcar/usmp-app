import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IHoursFreeRequest } from '../domain/dtos/hoursFree.request'
import HoursFreeEntity from '../domain/entities/hoursFree.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListHoursFree implements UseCase<IHoursFreeRequest, Promise<HoursFreeEntity>> {
  private repository: IBookingsRepository
  static instance: GetListHoursFree

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListHoursFree()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: IHoursFreeRequest): Promise<HoursFreeEntity> {
    const getData = this.repository.getListHourseFree(payload)
    return getData
  }
}

export default GetListHoursFree
