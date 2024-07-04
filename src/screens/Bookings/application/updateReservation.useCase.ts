import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IUpdateReservationRequest } from '../domain/dtos/reservationUpdate.request'
import { IUpdateReservationResponse } from '../domain/dtos/reservationUpdate.response'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class UpdateReservationUseCase implements UseCase<{
  reservationId: string,
  payload: IUpdateReservationRequest
}, Promise<IUpdateReservationResponse>> {
  private repository: IBookingsRepository
  static instance: UpdateReservationUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new UpdateReservationUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute({reservationId, payload}: {
    reservationId: string,
    payload: IUpdateReservationRequest
  }): Promise<IUpdateReservationResponse> {
    const getData = await this.repository.updateReservation(reservationId, payload)
    return getData
  }
}

export default UpdateReservationUseCase
