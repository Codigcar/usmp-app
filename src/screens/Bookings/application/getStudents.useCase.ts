import { UseCase } from '../../Auth/domain/useCases/base.useCase'
import { IHoursFreeRequest } from '../domain/dtos/hoursFree.request'
import HoursFreeEntity from '../domain/entities/hoursFree.entity'
import StudentsEntity from '../domain/entities/students.entity'
import IBookingsRepository from '../domain/repositories/bookings.repository'
import BookingsRepository from '../infrastructure/repositories/bookings.repository.impl'


class GetListStudents implements UseCase<{}, Promise<StudentsEntity>> {
  private repository: IBookingsRepository
  static instance: GetListStudents

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetListStudents()
    }
    return this.instance
  }

  constructor(repository: IBookingsRepository = BookingsRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(): Promise<StudentsEntity> {
    const getData = this.repository.getListStudents()
    return getData
  }
}

export default GetListStudents
