import { ILoginRequest } from '../domain/dtos/login'
import {
  ISendEmailRequest,
  ISendEmailResponse,
} from '../domain/dtos/recoveryPassword/sendEmail'
import IAuthRepository from '../domain/repositories/auth.repositoy'
import { UseCase } from '../domain/useCases/base.useCase'
import AuthRepository from '../infrastructure/repositories/auth.repository.impl'

class RecoveryPasswordSendEmailUseCase
  implements UseCase<ISendEmailRequest, Promise<ISendEmailResponse>>
{
  private repository: IAuthRepository
  static instance: RecoveryPasswordSendEmailUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new RecoveryPasswordSendEmailUseCase()
    }
    return this.instance
  }

  constructor(repository: IAuthRepository = AuthRepository.getInstance()) {
    this.repository = repository
  }

  public async execute(body: ISendEmailRequest) {
    return await this.repository.recoveryPasswordSendEmail(body)
  }
}

export default RecoveryPasswordSendEmailUseCase
