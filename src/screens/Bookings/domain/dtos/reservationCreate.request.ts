export interface ICreateReservationRequest {
  cubicleId: number
  scheduleId: number
  guestStudents: number[]
  accessories: number[]
}
