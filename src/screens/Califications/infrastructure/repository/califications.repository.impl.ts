import HttpClient from "../../../../libraries-implementation/http/http.implementation";
import IHttpClient from "../../../../libraries-implementation/http/http.interface";
import CalificationDetailEntity from "../../domain/entity/calificationDetail.entity";
import { ICalificationDetailRequest } from "../../domain/dtos/calificationDetail.request";
import ICalificationsRepository from "../../domain/repository/califications.repository";
import CalificationPeriodsEntity from "../../domain/entity/calificationPeriods.entity";
import { ICalificationPeriodsResponse } from "../../domain/dtos/calificationPeriods.response";
import { ICalificationDetailResponse } from "../../domain/dtos/calificationDetail.response";
import { ICalificationMainRequest } from "../../domain/dtos/calificationMain.request";
import CalificationMainEntity from "../../domain/entity/calificationMain.entity";
import { ICalificationsMainResponse } from "../../domain/dtos/calificationMain.response";

class CalificationsRepository implements ICalificationsRepository {

  private http: IHttpClient
  static instance: CalificationsRepository

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }
    
  static getInstance() {
    if (!this.instance) {
      this.instance = new CalificationsRepository()
    }
    return this.instance
  }

  public async getCalificationByCourseId({courseId}: ICalificationDetailRequest): Promise<CalificationDetailEntity> {
      const resp = await this.http.get<ICalificationDetailResponse>(`/course-grades/${courseId}`)
      const entity = CalificationDetailEntity.fromJson(resp)
      return entity
  }

  public async  getAllPeriods(): Promise<CalificationPeriodsEntity> {
    const resp = await this.http.get<ICalificationPeriodsResponse>(`/course-grades/curricula`)
    const entity = CalificationPeriodsEntity.fromJson(resp)
    return entity
  }

  public async getCalificationsByPeriodId(payload: ICalificationMainRequest): Promise<CalificationMainEntity> {
    const resp = await this.http.get<ICalificationsMainResponse>(`/course-grades/curricula/${payload.periodId}`)
    const entity = CalificationMainEntity.fromJson(resp)
    return entity
  }

}

export default CalificationsRepository