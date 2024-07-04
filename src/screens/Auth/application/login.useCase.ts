import Storage from '../../../libraries-implementation/storage'
import { ILoginRequest, ILoginResponse } from '../domain/dtos/login'
import IAuthRepository from '../domain/repositories/auth.repositoy'
import ILoginUseCase from '../domain/useCases/login.useCase'
import AuthRepository from '../infrastructure/repositories/auth.repository.impl'

class LoginUseCase implements ILoginUseCase {
  private repository: IAuthRepository
  static instance: LoginUseCase

  constructor(repository: IAuthRepository = new AuthRepository()) {
    this.repository = repository
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new LoginUseCase()
    }
    return this.instance
  }

  public async execute({ username, password }: ILoginRequest) {
    const response = await this.repository.login(username, password)
    // await Storage.getInstance().set("token", response.data.accessToken!)
    return response
  }
}
export default LoginUseCase