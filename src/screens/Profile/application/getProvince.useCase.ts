import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IDepartamentsResponse } from "../domain/dtos/departaments.response"
import { IProvinceRequest } from "../domain/dtos/provinces.request"
import { IProviceResponse } from "../domain/dtos/provinces.response"
import IProfileRepository from "../domain/repositories/profile.repository"
import ProfileRepositoryImpl from "../infrastructure/repositories/profile.repository.impl"

class GetProvinceUseCase implements UseCase<{}, Promise<IProviceResponse>>
{
  private repository: IProfileRepository
  static instance: GetProvinceUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetProvinceUseCase()
    }
    return this.instance
  }

  constructor(repository: IProfileRepository = ProfileRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IProvinceRequest): Promise<IProviceResponse> {
    return await this.repository.getProvinces(payload)
  }

}

export default GetProvinceUseCase
