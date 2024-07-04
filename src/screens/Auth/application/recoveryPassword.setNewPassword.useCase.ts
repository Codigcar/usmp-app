import IAuthRepository from '../domain/repositories/auth.repositoy'
import AuthRepository from '../infrastructure/repositories/auth.repository.impl'
import { UseCase } from '../domain/useCases/base.useCase'
import { ISetNewPasswordRequest } from '../domain/dtos/recoveryPassword/setNewPassword/setNewPassword.request'
import { ISetNewPasswordResponse } from '../domain/dtos/recoveryPassword/setNewPassword/setNewPassword.response'

class RecoveryPasswordSetNewPasswordUseCase implements UseCase<ISetNewPasswordRequest, Promise<ISetNewPasswordResponse>>
{
  private repository: IAuthRepository
  static instance: RecoveryPasswordSetNewPasswordUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new RecoveryPasswordSetNewPasswordUseCase()
    }
    return this.instance
  }

  constructor(repository: IAuthRepository = AuthRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: ISetNewPasswordRequest): Promise<ISetNewPasswordResponse> {
    return await this.repository.recoveryPasswordSetNewPassword(payload)
  }

}

export default RecoveryPasswordSetNewPasswordUseCase
