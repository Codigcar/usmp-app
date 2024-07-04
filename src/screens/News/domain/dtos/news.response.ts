export interface INewsResponse {
    success: boolean
    message: string
    data: INewsResponseData
  }
  
  export interface INewsResponseData {
    featured: INewsInfo[]
    news: INewsInfo[]
    events: INewsInfo[]
    totalPages: number
  }
  
  export interface INewsInfo {
    id: number
    title: string
    summary?: string
    description: string
    subtitle?: string
    backgroundColor: string
    backgroundImage: string
    featured: boolean
    categoryId?: number
    category?: string
    audienceType: string
    audiences: any[]
    startAt: string
    endAt: string
    priority?: number
    urlLink: string

    modality: string,
    currency: string,
    address: string,
    date: string,
    typeId: string,
    type?: string,
    cost: string,
    capacity: string,
  }
  