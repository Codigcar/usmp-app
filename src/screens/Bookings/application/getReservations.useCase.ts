import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import ReservationListEntity from '../domain/entities/reservationList.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListReservation implements UseCase<{}, Promise<ReservationListEntity>> {
  private repository: IBookingsRepository
  static instance: GetListReservation

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListReservation()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<ReservationListEntity> {
    const getData = this.repository.getListReservation()
    return getData
  }
}

export default GetListReservation
