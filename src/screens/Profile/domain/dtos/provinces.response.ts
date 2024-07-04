import { IDepartment } from './profile.response'

export interface IProviceResponse {
  success: boolean
  message: string
  data: IDepartment[]
}
