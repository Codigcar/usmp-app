import { useRef, useState } from 'react'
import { usePayment } from '../../../../components/payment/usePayment'

const useConfirmInformationInteractor = () => {
  const dataOrderIziPay = useRef<any>()
  const tokenIziPay = useRef<any>()
  const { generateOrder, getTokenSession } = usePayment()

  const fetchIziPay = async (amount: string) => {
    try {
      const getDataOrder = generateOrder()
      dataOrderIziPay.current = getDataOrder
      const getToken = await getTokenSession(
        getDataOrder.transactionId,
        getDataOrder.orderNumber,
        '10',
      )
      tokenIziPay.current = getToken.response.token
      return { status: true }
    } catch (error) {
      console.log("🚀 ----------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: ConfirmInformation.interactor.tsx:22 ~ fetchIziPay ~ error:", error)
      console.log("🚀 ----------------------------------------------------------------------------🚀")
      return { status: false }
    }
  }

  return {
    fetchIziPay,
    dataOrderIziPay,
    tokenIziPay,
  }
}

export default useConfirmInformationInteractor
