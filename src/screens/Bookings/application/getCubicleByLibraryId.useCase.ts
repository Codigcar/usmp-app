import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { ICubiclesRequest } from '../domain/dtos/cubicles.request'
import CubiclesEntity from '../domain/entities/cubicles.entity'
import SedeEntity from '../domain/entities/sedes.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListCubiclesByLibraryIdUseCase implements UseCase<ICubiclesRequest, Promise<CubiclesEntity>> {
  private repository: IBookingsRepository
  static instance: GetListCubiclesByLibraryIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListCubiclesByLibraryIdUseCase()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload: ICubiclesRequest): Promise<CubiclesEntity> {
    const getData = this.repository.getListCubiclesBySedeId(payload)
    return getData
  }
}

export default GetListCubiclesByLibraryIdUseCase
