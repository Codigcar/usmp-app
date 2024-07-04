export interface ICarnetResponse {
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    studentId: number
    student: Student
    curriculaId: number
    facultyId: number
    schoolId: number
    valid: boolean
    background: Background
  }
  
  export interface Background {
    type: 'Color' | 'Image'
    value: string
  }
  
  export interface Student {
    id: number
    sapId: string
    name: string
    lastName: string
    email: string
    phone: null
    documentType: null
    documentNumber: null
    imageUrl: string
  }
  