import { ICarnetRequest } from '../dtos/listCarnet.request'
import IListCoursesByStudyPlanIdResponse from '../dtos/listCoursesByStudyPlanId.response'
import { IListHomeRequest } from '../dtos/listHome.request'
import IStudyPlanResponse from '../dtos/listStudyPlan.response'
import CarnetEntity from '../entities/carnet.entity'
import HomeEntity from '../entities/home.entity'
import PopupEntity from '../entities/popup.entity'

export default interface IHomeRepository {
  listStudyPlan(): Promise<IStudyPlanResponse>
  listCoursesByStudyPlanId(planId: string): Promise<IListCoursesByStudyPlanIdResponse>
  getCarnetByStudyPlanId(payload: ICarnetRequest): Promise<CarnetEntity>
  getListPopups(): Promise<PopupEntity>
  getHome(payload: IListHomeRequest): Promise<HomeEntity>
}
