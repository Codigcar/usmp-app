import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import { IAccesoriosRequest } from '../../domain/dtos/accesorios.request'
import { IAccesoriosResponse } from '../../domain/dtos/accesorios.response'
import { ICreateReservationRequest } from '../../domain/dtos/reservationCreate.request'
import { ICreateReservationResponse } from '../../domain/dtos/reservationCreate.response'
import { ICubiclesRequest } from '../../domain/dtos/cubicles.request'
import { ICubiclesResponse } from '../../domain/dtos/cubicules.response'
import { IDatesFreeRequest } from '../../domain/dtos/datesFreeByCubicleId.request'
import { IDatesFreeResponse } from '../../domain/dtos/datesFreeByCubicleId.response'
import { IHoursFreeRequest } from '../../domain/dtos/hoursFree.request'
import { IHoursFreeResponse } from '../../domain/dtos/hoursFree.response'
import { ISedeResponse } from '../../domain/dtos/sedes.response'
import { IStudentsResponse } from '../../domain/dtos/students.response'
import AccesoriosEntity from '../../domain/entities/accesorios.entity'
import CubiclesEntity from '../../domain/entities/cubicles.entity'
import DatesFreeEntity from '../../domain/entities/datesFree.entity'
import HoursFreeEntity from '../../domain/entities/hoursFree.entity'
import SedeEntity from '../../domain/entities/sedes.entity'
import StudentsEntity from '../../domain/entities/students.entity';
import IBookingsRepository from '../../domain/repositories/bookings.repository'
import ReservationListEntity from '../../domain/entities/reservationList.entity'
import { IReservationListResponse } from '../../domain/dtos/reservationList.response'
import MotivosCancelEntity from '../../domain/entities/motivosCancel.entity'
import { IMotivosCancelReponseData, IMotivosCancelResponse } from '../../domain/dtos/reservationCancelMotivos.response'
import { IReservationCancelRequest } from '../../domain/dtos/reservationCancel.request'
import { IReservationCancelReponse } from '../../domain/dtos/reservationCancel.response'
import { IUpdateReservationResponse } from '../../domain/dtos/reservationUpdate.response'
import { IUpdateReservationRequest } from '../../domain/dtos/reservationUpdate.request'

class BookingsRepository implements IBookingsRepository {
  private http: IHttpClient
  static instance: BookingsRepository

  constructor(http: IHttpClient = new HttpClient()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new BookingsRepository()
    }
    return this.instance
  }

  public async getListSedes(): Promise<SedeEntity> {
    const response = await this.http.get<ISedeResponse>('/libraries')
    const entity = SedeEntity.fromJson(response)
    return entity
  }

  public async getListCubiclesBySedeId(payload: ICubiclesRequest): Promise<CubiclesEntity> {
    const response = await this.http.get<ICubiclesResponse>(`/cubicles?libraryId=${payload.libraryId}`)
    const entity = CubiclesEntity.fromJson(response)
    return entity
  }
  
  public async getListDatesFreeByCubicleId(payload: IDatesFreeRequest): Promise<DatesFreeEntity> {
    const response = await this.http.get<IDatesFreeResponse>(`/cubicle-schedules/available-dates?cubicleId=${payload.cubicleId}`)
    const entity = DatesFreeEntity.fromJson(response)
    return entity
  }

  public async getListHourseFree(payload: IHoursFreeRequest): Promise<HoursFreeEntity> {
    const response = await this.http.get<IHoursFreeResponse>(`/cubicle-schedules?cubicleId=${payload.cubicleId}&date=${payload.date}&numberHours=${payload.numberHours}`)
    const entity = HoursFreeEntity.fromJson(response)
    return entity
  }

  public async getListStudents(): Promise<StudentsEntity> {
    const response = await this.http.get<IStudentsResponse>('/students')
    const entity = StudentsEntity.fromJson(response)
    return entity
  }

  public async getListAccesorios(payload: IAccesoriosRequest): Promise<AccesoriosEntity> {
    const response = await this.http.get<IAccesoriosResponse>(`/accessories?libraryId=${payload.libraryId}`)
    const entity = AccesoriosEntity.fromJson(response)
    return entity
  }

  public async createReservation(payload: ICreateReservationRequest): Promise<ICreateReservationResponse> {
    const response = await this.http.post<ICreateReservationRequest,ICreateReservationResponse>(`/cubicle-reservations`, payload)
    return response
  }

  public async updateReservation(reservationId: string, payload: IUpdateReservationRequest): Promise<IUpdateReservationResponse> {
    const response = await this.http.put<IUpdateReservationRequest,IUpdateReservationResponse>(`/cubicle-reservations/${reservationId}`, payload)
    return response
  }

  public async getListReservation(): Promise<ReservationListEntity> {
    const response = await this.http.get<IReservationListResponse>('/cubicle-reservations')
    const entity = ReservationListEntity.fromJson(response)
    return entity
  }

  public async getListMotivosCancel(): Promise<MotivosCancelEntity> {
    const response = await this.http.get<IMotivosCancelResponse>('/reason-cancellation')
    const entity = MotivosCancelEntity.fromJson(response)
    return entity
  }

  public async cancelReservation(payload: IReservationCancelRequest): Promise<IReservationCancelReponse> {
    const response = await this.http.delete<IReservationCancelReponse>(`/cubicle-reservations/${payload.reservaId}/cancel`,{
      data:{
        ReasonCancellationId: payload.ReasonCancellationId
      }
    })
    return response
  }
}

export default BookingsRepository
