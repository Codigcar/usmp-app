import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IAccesoriosRequest } from '../domain/dtos/accesorios.request'
import { IHoursFreeRequest } from '../domain/dtos/hoursFree.request'
import AccesoriosEntity from '../domain/entities/accesorios.entity'
import HoursFreeEntity from '../domain/entities/hoursFree.entity'
import StudentsEntity from '../domain/entities/students.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListAccesorios implements UseCase<IAccesoriosRequest, Promise<AccesoriosEntity>> {
  private repository: IBookingsRepository
  static instance: GetListAccesorios

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListAccesorios()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(payload:IAccesoriosRequest ): Promise<AccesoriosEntity> {
    const getData = this.repository.getListAccesorios(payload)
    return getData
  }
}

export default GetListAccesorios
