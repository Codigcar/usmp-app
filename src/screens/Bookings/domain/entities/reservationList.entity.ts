import {
  IReservationListResponse,
  IReservationListResponseData,
} from '../dtos/reservationList.response'
import { AccesoriosEntityData } from './accesorios.entity'
import { CubiclesEntityData } from './cubicles.entity'
import { HoursFreeEntityData } from './hoursFree.entity'
import { StudentsEntityData } from './students.entity'

export default class ReservationListEntity {
  constructor(
    readonly success: boolean,
    readonly message: string,
    readonly data: ReservationListEntityData[],
  ) {}

  static fromJson(json: IReservationListResponse) {
    return new ReservationListEntity(
      json['success'],
      json['message'],
      Array.from(json['data']).map((x) => ReservationListEntityData.fromJson(x)),
    )
  }
}

export class ReservationListEntityData {
  constructor(
    readonly id: number,
    readonly attended: boolean,
    readonly status: string,
    readonly observation: string,
    readonly cubicle: CubiclesEntityData,
    readonly cubicleSchedule: HoursFreeEntityData,
    readonly responsibleStudent: StudentsEntityData,
    readonly reasonCancellation: string,
    readonly accessories: AccesoriosEntityData[],
    readonly guestStudents: StudentsEntityData[],
    readonly sedeId: string,
  ) {}
  static fromJson(json: IReservationListResponseData) {
    return new ReservationListEntityData(
      json['id'],
      json['attended'],
      json['status'],
      json['observation'],
      CubiclesEntityData.fromJson(json['cubicle']),
      HoursFreeEntityData.fromJson(json['cubicleSchedule']),
      StudentsEntityData.fromJson(json['responsibleStudent']),
      json['reasonCancellation'],
      Array.from(json['accessories']).map((x) => AccesoriosEntityData.fromJson(x)),
      Array.from(json['guestStudents']).map((x) => StudentsEntityData.fromJson(x)),
      json['sedeId'] ?? '3',
    )
  }
}
