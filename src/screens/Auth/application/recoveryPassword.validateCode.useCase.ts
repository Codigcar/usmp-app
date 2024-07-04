import {
  ISendEmailRequest,
  ISendEmailResponse,
} from '../domain/dtos/recoveryPassword/sendEmail'
import IAuthRepository from '../domain/repositories/auth.repositoy'
import AuthRepository from '../infrastructure/repositories/auth.repository.impl'
import { UseCase } from '../domain/useCases/base.useCase'
import { IValidateCodeRequest } from '../domain/dtos/recoveryPassword/validateCode/validatecode.request'
import { IValidateCodeResponse } from '../domain/dtos/recoveryPassword/validateCode/validateCode.response'

class RecoveryPasswordValidateCodeUseCase implements UseCase<IValidateCodeRequest, Promise<IValidateCodeResponse>>
{
  private repository: IAuthRepository
  static instance: RecoveryPasswordValidateCodeUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new RecoveryPasswordValidateCodeUseCase()
    }
    return this.instance
  }

  constructor(repository: IAuthRepository = AuthRepository.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IValidateCodeRequest): Promise<IValidateCodeResponse> {
    return await this.repository.recoveryPasswordValidateCode(payload)
  }

}

export default RecoveryPasswordValidateCodeUseCase
