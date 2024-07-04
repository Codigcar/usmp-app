import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IDepartamentsResponse } from "../domain/dtos/departaments.response"
import IProfileRepository from "../domain/repositories/profile.repository"
import ProfileRepositoryImpl from "../infrastructure/repositories/profile.repository.impl"

class GetDepartamentsUseCase implements UseCase<{}, Promise<IDepartamentsResponse>>
{
  private repository: IProfileRepository
  static instance: GetDepartamentsUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetDepartamentsUseCase()
    }
    return this.instance
  }

  constructor(repository: IProfileRepository = ProfileRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(): Promise<IDepartamentsResponse> {
    return await this.repository.getDepartaments()
  }

}

export default GetDepartamentsUseCase
