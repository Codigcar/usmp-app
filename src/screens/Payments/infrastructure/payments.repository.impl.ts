import HttpClient from '../../../libraries-implementation/http/http.implementation'
import IHttpClient from '../../../libraries-implementation/http/http.interface'
import { IPaymentsRequest } from '../domain/dtos/payments.request'
import { IPaymentsResponse } from '../domain/dtos/payments.response'
import PaymentsEntity from '../domain/entity/payments.entity'
import IPaymentsRepository from '../domain/repository/payments.repository'

class PaymentsRepositoryImpl implements IPaymentsRepository {
  private http: IHttpClient
  static instance: PaymentsRepositoryImpl

  constructor(http: IHttpClient = HttpClient.getInstance()) {
    this.http = http
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PaymentsRepositoryImpl()
    }
    return this.instance
  }

  public async  getPayments(payload: IPaymentsRequest): Promise<PaymentsEntity> {
    const response = await this.http.get<IPaymentsResponse>(`/payments?curriculaId=${payload.studyPlanId}`)
    const entity = PaymentsEntity.fromJson(response)
    return entity
  }
}

export default PaymentsRepositoryImpl