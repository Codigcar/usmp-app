import { IPaymentsRequest } from '../dtos/payments.request'
import PaymentsEntity from '../entity/payments.entity'

export default interface IPaymentsRepository {
  getPayments(payload: IPaymentsRequest): Promise<PaymentsEntity>
}
