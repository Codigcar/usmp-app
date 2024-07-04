import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IDistrictsRequest } from "../domain/dtos/districts.request"
import { IDistrictsResponse } from "../domain/dtos/districts.response"
import IProfileRepository from "../domain/repositories/profile.repository"
import ProfileRepositoryImpl from "../infrastructure/repositories/profile.repository.impl"

class GetDistrictUseCase implements UseCase<{}, Promise<IDistrictsResponse>>
{
  private repository: IProfileRepository
  static instance: GetDistrictUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetDistrictUseCase()
    }
    return this.instance
  }

  constructor(repository: IProfileRepository = ProfileRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IDistrictsRequest): Promise<IDistrictsResponse> {
    return await this.repository.getDistricts(payload)
  }

}

export default GetDistrictUseCase
