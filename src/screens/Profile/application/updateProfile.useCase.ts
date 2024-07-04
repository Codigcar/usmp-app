import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IProvinceRequest } from "../domain/dtos/provinces.request"
import { IUpdateProfileRequest } from "../domain/dtos/updateProfile.request"
import { IUpdateProfileResponse } from "../domain/dtos/updateProfile.response"
import IProfileRepository from "../domain/repositories/profile.repository"
import ProfileRepositoryImpl from "../infrastructure/repositories/profile.repository.impl"

class UpdateProfileUseCase implements UseCase<IUpdateProfileRequest, Promise<IUpdateProfileResponse>>
{
  private repository: IProfileRepository
  static instance: UpdateProfileUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new UpdateProfileUseCase()
    }
    return this.instance
  }

  constructor(repository: IProfileRepository = ProfileRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IUpdateProfileRequest): Promise<IUpdateProfileResponse> {
    return await this.repository.updateProfile(payload)
  }

}

export default UpdateProfileUseCase
