export interface IMotivosCancelResponse {
  data: IMotivosCancelReponseData[]
  success: boolean
  message: string
}

export interface IMotivosCancelReponseData {
  id: number
  reason: string
}
