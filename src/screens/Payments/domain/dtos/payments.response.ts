export interface IPaymentsResponse {
  success: boolean
  message: string
  data: IPaymentsResponseData[]
}

export interface IPaymentsResponseData {
  id: string
  code: string
  type: string
  description: string
  period: string
  expiredAt: string
  lateAmount: string
  amount: string
  currency: string
  total: string
  status: string
}


export type Type = 'P' | 'S'
