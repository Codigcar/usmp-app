export interface ICalificationPeriodsResponse {
  success: boolean
  message: string
  data: IDatum[]
}

export interface IDatum {
  name: string
  periods: IPeriod[]
}

export interface IPeriod {
  id: number
  code: string
  year: string
  yearName: string
  period: string
  periodName: string
}
