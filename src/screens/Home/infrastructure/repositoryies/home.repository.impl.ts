import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import { ICarnetRequest } from '../../domain/dtos/listCarnet.request'
import { ICarnetResponse } from '../../domain/dtos/listCarnet.response'
import IListCoursesByStudyPlanIdResponse from '../../domain/dtos/listCoursesByStudyPlanId.response'
import { IListHomeRequest } from '../../domain/dtos/listHome.request'
import { IHomeResponse } from '../../domain/dtos/listHome.response'
import { IPopupResponse } from '../../domain/dtos/listPopup.response'
import IStudyPlanResponse from '../../domain/dtos/listStudyPlan.response'
import CarnetEntity from '../../domain/entities/carnet.entity'
import HomeEntity from '../../domain/entities/home.entity'
import PopupEntity from '../../domain/entities/popup.entity'
import IHomeRepository from '../../domain/repositories/home.repository'

class HomeRepository implements IHomeRepository {
  private http: IHttpClient
  static instance: HomeRepository

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HomeRepository()
    }
    return this.instance
  }

  async listStudyPlan(): Promise<IStudyPlanResponse> {
    const response = await this.http.get<IStudyPlanResponse>('/curricula')
    return response
  }

  async listCoursesByStudyPlanId(
    planId: string,
  ): Promise<IListCoursesByStudyPlanIdResponse> {
    const response = await this.http.get<IListCoursesByStudyPlanIdResponse>(
      `/courses?curriculaId=${planId}`,
    )
    return response
  }

  async getCarnetByStudyPlanId(payload: ICarnetRequest): Promise<CarnetEntity> {
    const response = await this.http.get<ICarnetResponse>(
      `/carnets?curriculaId=${payload.studyPlanId}`,
    )
    const entity = CarnetEntity.fromJson(response)
    return entity
  }

  async getListPopups(): Promise<PopupEntity> {
    const response = await this.http.get<IPopupResponse>('/popups')
    const entity = PopupEntity.fromJson(response)
    return entity
  }

  async getHome(payload: IListHomeRequest): Promise<HomeEntity> {
    const response = await this.http.get<IHomeResponse>(`/home?curriculaId=${payload.curriculaId}`)
    const entity = HomeEntity.fromJson(response)
    return entity
  }
}

export default HomeRepository
