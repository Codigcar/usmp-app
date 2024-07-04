import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IReservationCancelRequest } from '../domain/dtos/reservationCancel.request'
import { IReservationCancelReponse } from '../domain/dtos/reservationCancel.response'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class CancelReservationsUserCase implements UseCase<IReservationCancelRequest, Promise<IReservationCancelReponse>> {
  private repository: IBookingsRepository
  static instance: CancelReservationsUserCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new CancelReservationsUserCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: IReservationCancelRequest): Promise<IReservationCancelReponse> {
    const getData = this.repository.cancelReservation(payload)
    return getData
  }
}

export default CancelReservationsUserCase
