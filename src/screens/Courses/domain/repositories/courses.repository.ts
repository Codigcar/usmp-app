import { ICourseDetailRequest, ICourseSummaryRequest } from '../dtos';
import { IPuntualityRequest } from '../dtos/puntuality.request';
import { ICourseStudentsRequest } from '../dtos/courseStudents.request';
import CourseDetailEntity from '../entities/courseDetail.entity';
import CourseSummaryEntity from "../entities/courseSummary.entity";
import PuntualityEntity from '../entities/puntuality.entity';
import CourseStudentsEntity from '../entities/courseStudents.entity';

export default interface ICoursesRepository {
  eventsByCourse({
    startAt,
    endAt,
  }: ICourseDetailRequest): Promise<CourseDetailEntity>

  getCourseSummaryByStudyPlanId(payload: ICourseSummaryRequest): Promise<CourseSummaryEntity>
  getPuntualityByEventId(payload: IPuntualityRequest): Promise<PuntualityEntity>
  getStudentsByEventId(payload: ICourseStudentsRequest): Promise<CourseStudentsEntity>
}
