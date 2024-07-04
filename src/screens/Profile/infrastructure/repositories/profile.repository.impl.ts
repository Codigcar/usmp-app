import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import { IDepartamentsResponse } from '../../domain/dtos/departaments.response'
import { IDistrictsRequest } from '../../domain/dtos/districts.request'
import { IDistrictsResponse } from '../../domain/dtos/districts.response'
import { IProfileResponse } from '../../domain/dtos/profile.response'
import { IProvinceRequest } from '../../domain/dtos/provinces.request'
import { IProviceResponse } from '../../domain/dtos/provinces.response'
import { IUpdateProfileRequest } from '../../domain/dtos/updateProfile.request'
import { IUpdateProfileResponse } from '../../domain/dtos/updateProfile.response'
import ProfileEntity from '../../domain/entities/profile.entity'
import IProfileRepository from '../../domain/repositories/profile.repository'

class ProfileRepositoryImpl implements IProfileRepository {
  private http: IHttpClient
  static instance: ProfileRepositoryImpl

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProfileRepositoryImpl()
    }
    return this.instance
  }

  public async getProfile(): Promise<ProfileEntity> {
    const response = await this.http.get<IProfileResponse>(`/profile`)
    const entity = ProfileEntity.fromJson(response)
    return entity
  }

  public async getDepartaments(): Promise<IDepartamentsResponse> {
    return await this.http.get<IDepartamentsResponse>(`/ubigeo/departments`)
  }

  public async getProvinces(payload: IProvinceRequest): Promise<IProviceResponse> {
    return await this.http.get<IDepartamentsResponse>(`/ubigeo/provinces?departmentId=${payload.departmentId}`)
  }

  public async getDistricts(payload: IDistrictsRequest): Promise<IDistrictsResponse> {
    return await this.http.get<IDepartamentsResponse>(`/ubigeo/districts?provinceId=${payload.provinceId}`)
  }

  public async  updateProfile(payload: IUpdateProfileRequest): Promise<IUpdateProfileResponse> {
    return await this.http.post<IUpdateProfileRequest,IUpdateProfileResponse>('/profile', {
      ...payload
    })
  }
}

export default ProfileRepositoryImpl
