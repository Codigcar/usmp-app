export interface ICourseStudentsResponse {
  success: boolean
  message: string
  data: IDataStudent[]
}

export interface IDataStudent {
  id: string
  name: string
  email: string
  imageUrl: string
}
