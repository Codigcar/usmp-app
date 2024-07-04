export interface ICourseDetailResponse {
  success: boolean
  message: string
  data: IDatum[]
}

export interface IDatum {
  id: string
  classroom: string
  section: string
  confirmation: null
  date: Date
  startTime: string
  endTime: string
  professor: IProfessor
}

export interface IProfessor {
  id: number
  code: string
  name: string
  imageUrl: string
}
