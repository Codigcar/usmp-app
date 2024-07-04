import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import ProfileEntity from "../domain/entities/profile.entity"
import IProfileRepository from "../domain/repositories/profile.repository"
import ProfileRepositoryImpl from "../infrastructure/repositories/profile.repository.impl"

class GetProfileUseCase implements UseCase<{}, Promise<ProfileEntity>>
{
  private repository: IProfileRepository
  static instance: GetProfileUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetProfileUseCase()
    }
    return this.instance
  }

  constructor(repository: IProfileRepository = ProfileRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(): Promise<ProfileEntity> {
    return await this.repository.getProfile()
  }

}

export default GetProfileUseCase
