import HttpClient from '../../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../../libraries-implementation/http/http.interface'
import StudentEntity from '../../domain/entities/student.entity'
import IAuthRepository from '../../domain/repositories/auth.repositoy'
import { ILoginResponse, ILoginRequest } from '../../domain/dtos/login'
import {
  ISendEmailRequest,
  ISendEmailResponse,
} from '../../domain/dtos/recoveryPassword/sendEmail'
import { IChangePasswordResponse } from '../../domain/dtos/changePassword/changePassword.response'
import { ISetNewPasswordResponse } from '../../domain/dtos/recoveryPassword/setNewPassword/setNewPassword.response'
import { IValidateCodeResponse } from '../../domain/dtos/recoveryPassword/validateCode/validateCode.response'
import { IValidateCodeRequest } from '../../domain/dtos/recoveryPassword/validateCode/validatecode.request'
import { IChangePasswordRequest } from '../../domain/dtos/changePassword/changePassword.request'
import { ISetNewPasswordRequest } from '../../domain/dtos/recoveryPassword/setNewPassword/setNewPassword.request'

class AuthRepository implements IAuthRepository {
  private http: IHttpClient
  static instance: AuthRepository

  constructor(http: IHttpClient = new HttpClient()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthRepository()
    }
    return this.instance
  }

  public async login(username: string,password: string): Promise<{success: boolean, message: string, data: StudentEntity}> {
    const response = await this.http.post<ILoginRequest, ILoginResponse>(
      '/auth/login',
      {
        username,
        password,
      },
    )
    return {
      success: response.success,
      message: response.message,
      data:StudentEntity.fromJson(response)
    }
  }

  public async recoveryPasswordSendEmail({ email }: ISendEmailRequest): Promise<ISendEmailResponse> {
    const response = await this.http.post<ISendEmailRequest, ISendEmailResponse>(
      '/recovery-password/send-email',
      {
        email
      },
    )
    return response
  }

  public async  recoveryPasswordValidateCode({email, code}: IValidateCodeRequest): Promise<IValidateCodeResponse> {
    const response = await this.http.post<IValidateCodeRequest, IValidateCodeResponse>(
      '/recovery-password/validate-code',
      {
        email,
        code
      },
    )
    return response
  }

  public async  recoveryPasswordSetNewPassword({email, code, password, passwordConfirmation}: ISetNewPasswordRequest): Promise<ISetNewPasswordResponse> {
    const response = await this.http.post<ISetNewPasswordRequest, ISetNewPasswordResponse>(
      '/recovery-password/reset-password',
      {
        email,
        code,
        password,
        passwordConfirmation
      },
    )
    return response
  }

  public async  changePassword({username, actualPassword, password, passwordConfirmation}: IChangePasswordRequest): Promise<IChangePasswordResponse> {
    const response = await this.http.post<IChangePasswordRequest, IChangePasswordResponse>(
      '/change-password',
      {
        username,
        actualPassword,
        password,
        passwordConfirmation
      },
    )
    return response
  }
}

export default AuthRepository
