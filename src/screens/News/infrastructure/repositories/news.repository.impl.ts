import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import { IEventsResponse } from '../../domain/dtos/events.response'
import { INewsResponse } from '../../domain/dtos/news.response'
import EventEntity from '../../domain/entities/events.entity'
import NewEntity from '../../domain/entities/news.entity'
import INewsRepository from '../../domain/repositories/news.repository'

class NewsRepository implements INewsRepository {
  private http: IHttpClient
  static instance: NewsRepository

  constructor(http: IHttpClient = new HttpClient()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new NewsRepository()
    }
    return this.instance
  }

  public async getListNews(): Promise<NewEntity> {
    const response = await this.http.get<INewsResponse>('/news?page=1&pageSize=15')
    const entity = NewEntity.fromJson(response)
    return entity
  }

  public async getListEvents(): Promise<EventEntity> {
    const response = await this.http.get<IEventsResponse>('/events?page=1&pageSize=15')
    const entity = EventEntity.fromJson(response)
    return entity
  }

  public async getListEvents2(): Promise<NewEntity> {
    const response = await this.http.get<INewsResponse>('/events?page=1&pageSize=15')
    const entity = NewEntity.fromJson(response)
    
    console.log("🚀 ----------------------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: news.repository.impl.ts:39 ~ NewsRepository ~ getListEvents2 ~ entity:", JSON.stringify(entity.data.news))
    console.log("🚀 ~ file: news.repository.impl.ts:40 ~ NewsRepository ~ getListEvents2 ~ entity:", JSON.stringify(entity.data.totalPages))
    console.log("🚀 ----------------------------------------------------------------------------------------🚀")
    return entity
  }
}

export default NewsRepository
