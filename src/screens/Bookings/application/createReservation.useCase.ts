import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { ICreateReservationRequest } from '../domain/dtos/reservationCreate.request'
import { ICreateReservationResponse } from '../domain/dtos/reservationCreate.response'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class CreateReservationUseCase implements UseCase<ICreateReservationRequest, Promise<ICreateReservationResponse>> {
  private repository: IBookingsRepository
  static instance: CreateReservationUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new CreateReservationUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: ICreateReservationRequest): Promise<ICreateReservationResponse> {
    const getData = this.repository.createReservation(payload)
    return getData
  }
}

export default CreateReservationUseCase
