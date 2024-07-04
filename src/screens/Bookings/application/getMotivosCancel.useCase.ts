import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import MotivosCancelEntity from '../domain/entities/motivosCancel.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListMotivosCancelUseCase implements UseCase<{}, Promise<MotivosCancelEntity>> {
  private repository: IBookingsRepository
  static instance: GetListMotivosCancelUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListMotivosCancelUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<MotivosCancelEntity> {
    const getData = this.repository.getListMotivosCancel()
    return getData
  }
}

export default GetListMotivosCancelUseCase
