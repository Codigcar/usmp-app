import { IDepartamentsResponse } from '../dtos/departaments.response'
import { IDistrictsRequest } from '../dtos/districts.request'
import { IDistrictsResponse } from '../dtos/districts.response'
import { IProvinceRequest } from '../dtos/provinces.request'
import { IProviceResponse } from '../dtos/provinces.response'
import { IUpdateProfileRequest } from '../dtos/updateProfile.request'
import { IUpdateProfileResponse } from '../dtos/updateProfile.response'
import ProfileEntity from '../entities/profile.entity'

export default interface IProfileRepository {
  getProfile(): Promise<ProfileEntity>
  getDepartaments(): Promise<IDepartamentsResponse>
  getProvinces(payload: IProvinceRequest): Promise<IProviceResponse>
  getDistricts(payload: IDistrictsRequest): Promise<IDistrictsResponse>
  updateProfile(payload: IUpdateProfileRequest): Promise<IUpdateProfileResponse>
}
