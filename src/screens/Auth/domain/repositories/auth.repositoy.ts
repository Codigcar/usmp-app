import { IChangePasswordResponse } from '../dtos/changePassword/changePassword.response'
import { ISendEmailRequest, ISendEmailResponse } from '../dtos/recoveryPassword/sendEmail'
import { ISetNewPasswordResponse } from '../dtos/recoveryPassword/setNewPassword/setNewPassword.response'
import { IValidateCodeResponse } from '../dtos/recoveryPassword/validateCode/validateCode.response'
import StudentEntity from '../entities/student.entity'
import { IValidateCodeRequest } from '../dtos/recoveryPassword/validateCode/validatecode.request';
import { ISetNewPasswordRequest } from '../dtos/recoveryPassword/setNewPassword/setNewPassword.request'
import { IChangePasswordRequest } from '../dtos/changePassword/changePassword.request'

export default interface IAuthRepository {
  login(username: string, password: string): Promise<{success: boolean, message: string, data: StudentEntity}>
  recoveryPasswordSendEmail(body: ISendEmailRequest): Promise<ISendEmailResponse>
  recoveryPasswordValidateCode(body:IValidateCodeRequest): Promise<IValidateCodeResponse>
  recoveryPasswordSetNewPassword(body: ISetNewPasswordRequest): Promise<ISetNewPasswordResponse>
  changePassword(body: IChangePasswordRequest): Promise<IChangePasswordResponse>
}
