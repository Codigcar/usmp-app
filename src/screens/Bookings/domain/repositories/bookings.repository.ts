import { IAccesoriosRequest } from '../dtos/accesorios.request'
import { ICreateReservationRequest } from '../dtos/reservationCreate.request'
import { ICreateReservationResponse } from '../dtos/reservationCreate.response'
import { ICubiclesRequest } from '../dtos/cubicles.request'
import { IDatesFreeRequest } from '../dtos/datesFreeByCubicleId.request'
import { IHoursFreeRequest } from '../dtos/hoursFree.request'
import AccesoriosEntity from '../entities/accesorios.entity'
import CubiclesEntity from '../entities/cubicles.entity'
import DatesFreeEntity from '../entities/datesFree.entity'
import HoursFreeEntity from '../entities/hoursFree.entity'
import SedeEntity from '../entities/sedes.entity'
import StudentsEntity from '../entities/students.entity'
import ReservationListEntity from '../entities/reservationList.entity'
import MotivosCancelEntity from '../entities/motivosCancel.entity'
import { IReservationCancelRequest } from '../dtos/reservationCancel.request'
import { IReservationCancelReponse } from '../dtos/reservationCancel.response'
import { IUpdateReservationRequest } from '../dtos/reservationUpdate.request'
import { IUpdateReservationResponse } from '../dtos/reservationUpdate.response'

export default interface IBookingsRepository {
  getListSedes(): Promise<SedeEntity>
  getListCubiclesBySedeId(payload: ICubiclesRequest): Promise<CubiclesEntity>
  getListDatesFreeByCubicleId(payload: IDatesFreeRequest): Promise<DatesFreeEntity>
  getListHourseFree(payload: IHoursFreeRequest): Promise<HoursFreeEntity>
  getListStudents(): Promise<StudentsEntity>
  getListAccesorios(payload: IAccesoriosRequest): Promise<AccesoriosEntity>
  getListReservation(): Promise<ReservationListEntity>
  getListMotivosCancel(): Promise<MotivosCancelEntity>
  createReservation(payload: ICreateReservationRequest): Promise<ICreateReservationResponse>
  updateReservation(reservationId: string, payload: IUpdateReservationRequest): Promise<IUpdateReservationResponse>
  cancelReservation(payload: IReservationCancelRequest): Promise<IReservationCancelReponse>
}
