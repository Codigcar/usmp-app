import { UseCase } from "../../Auth/domain/useCases/base.useCase"
import { IPaymentsRequest } from "../domain/dtos/payments.request"
import PaymentsEntity from "../domain/entity/payments.entity"
import IPaymentsRepository from "../domain/repository/payments.repository"
import PaymentsRepositoryImpl from "../infrastructure/payments.repository.impl"

class GetPaymentsByPlanStudyIdUseCase implements UseCase<IPaymentsRequest, Promise<PaymentsEntity>>
{
  private repository: IPaymentsRepository
  static instance: GetPaymentsByPlanStudyIdUseCase

  static getInstance() {
    if (!this.instance) {
      this.instance = new GetPaymentsByPlanStudyIdUseCase()
    }
    return this.instance
  }

  constructor(repository: IPaymentsRepository = PaymentsRepositoryImpl.getInstance()) {
    this.repository = repository
  }
  public async execute(payload: IPaymentsRequest): Promise<PaymentsEntity> {
    return await this.repository.getPayments(payload)
  }

}

export default GetPaymentsByPlanStudyIdUseCase
