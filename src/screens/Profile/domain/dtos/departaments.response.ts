import { IDepartment } from './profile.response'

export interface IDepartamentsResponse {
  success: boolean
  message: string
  data: IDepartment[]
}
