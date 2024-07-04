import { ICalificationDetailRequest } from '../dtos/calificationDetail.request'
import { ICalificationMainRequest } from '../dtos/calificationMain.request'
import CalificationDetailEntity from '../entity/calificationDetail.entity'
import CalificationPeriodsEntity from '../entity/calificationPeriods.entity'
import CalificationMainEntity from '../entity/calificationMain.entity'

export default interface ICalificationsRepository {
  getCalificationByCourseId(payload: ICalificationDetailRequest): Promise<CalificationDetailEntity>
  getAllPeriods(): Promise<CalificationPeriodsEntity>
  getCalificationsByPeriodId(payload: ICalificationMainRequest): Promise<CalificationMainEntity>
}
