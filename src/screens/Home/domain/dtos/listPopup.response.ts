export interface IPopupResponse {
  success: boolean
  message: string
  data: IPopupResponseData[]
}

export interface IPopupResponseData {
  id: number
  title: string
  summary: string
  subtitle: string
  urlLink: string
  backgroundColor: string
  backgroundImage: null
  startAt: string
  endAt: string
  section: number
  sectionId: null
}
