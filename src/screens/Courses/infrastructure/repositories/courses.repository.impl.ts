import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import CourseDetailEntity from '../../domain/entities/courseDetail.entity'
import { ICourseDetailRequest } from '../../domain/dtos/courseDetail.request'
import CourseSummaryEntity from '../../domain/entities/courseSummary.entity'
import ICoursesRepository from '../../domain/repositories/courses.repository'
import { IPuntualityRequest } from '../../domain/dtos/puntuality.request'
import PuntualityEntity from '../../domain/entities/puntuality.entity'
import { ICourseDetailResponse, ICourseSummaryRequest, ICourseSummaryResponse } from '../../domain/dtos'
import { IPuntualityResponse } from '../../domain/dtos/puntuality.response'
import { ICourseStudentsRequest } from '../../domain/dtos/courseStudents.request'
import CourseStudentsEntity from '../../domain/entities/courseStudents.entity'
import { ICourseStudentsResponse } from '../../domain/dtos/courseStudents.response'

class CourseRepository implements ICoursesRepository {
  private http: IHttpClient
  static instance: CourseRepository

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CourseRepository()
    }
    return this.instance
  }

  public async eventsByCourse({
    eventId,
    startAt,
    endAt,
  }: ICourseDetailRequest): Promise<CourseDetailEntity> {
    const resp = await this.http.get<ICourseDetailResponse>(`/course-events/${eventId}/schedules?startAt=${startAt}&endAt=${endAt}`)
    const entity = CourseDetailEntity.fromJson(resp)
    return entity
  }

  public async getCourseSummaryByStudyPlanId(payload: ICourseSummaryRequest): Promise<CourseSummaryEntity> {
    const resp = await this.http.get<ICourseSummaryResponse>(`/course-summary?curriculaId=${payload.planStudyId}`)
    const entity = CourseSummaryEntity.fromJson(resp)
    return entity
  }

  public async getPuntualityByEventId(payload: IPuntualityRequest): Promise<PuntualityEntity> {
    const resp = await this.http.get<IPuntualityResponse>(`/student-attendance/${payload.eventId}`)
    const entity = PuntualityEntity.fromJson(resp)
    return entity
  }

  public async getStudentsByEventId(payload: ICourseStudentsRequest): Promise<CourseStudentsEntity> {
    const resp = await this.http.get<ICourseStudentsResponse>(`/course-classmates/${payload.eventId}`)
    const entity = CourseStudentsEntity.fromJson(resp)
    return entity
  }

}

export default CourseRepository
