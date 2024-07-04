import IAuthRepository from '../domain/repositories/auth.repositoy'
import AuthRepository from '../infrastructure/repositories/auth.repository.impl'
import { UseCase } from '../domain/useCases/base.useCase'
import { IChangePasswordRequest } from '../domain/dtos/changePassword/changePassword.request'
import { IChangePasswordResponse } from '../domain/dtos/changePassword/changePassword.response'

class ChangePasswordUseCase implements UseCase<IChangePasswordRequest, Promise<IChangePasswordResponse>>
{
  private repository: IAuthRepository
  static instance: ChangePasswordUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChangePasswordUseCase()
    }
    return this.instance
  }

  constructor(repository: IAuthRepository = AuthRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IChangePasswordRequest): Promise<IChangePasswordResponse> {
    return await this.repository.changePassword(payload)
  }

}

export default ChangePasswordUseCase
