import { IDepartment } from './profile.response'

export interface IDistrictsResponse {
  success: boolean
  message: string
  data: IDepartment[]
}
