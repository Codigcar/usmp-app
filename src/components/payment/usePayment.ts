import { useEffect, useState } from 'react'
import { MERCHANT_CODE, PUBLIC_KEY, REQUEST_SOURCE } from './keys'
import axios from 'axios'

export interface IResponseToken {
  code: string
  message: string
  response: IResponse
}

export interface IResponse {
  token: string
  userOrg: string
  userScoring: string
}

const ApiIzipay = axios.create({
  baseURL: 'https://sandbox-api-pw.izipay.pe:443',
})

export const usePayment = () => {
  const generateOrder = () => {
    const currentTimeUnix = Math.floor(Date.now()) * 1000
    const transactionId = currentTimeUnix.toString().slice(0, 14)
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString()

    return {
      currentTimeUnix,
      transactionId,
      orderNumber,
    }
  }

  const getTokenSession = async (
    transactionId: string,
    orderNumber: string,
    amount: string,
  ) => {
    const amountDecimal = String(parseFloat(amount).toFixed(2))
    const headers = {
      'Content-Type': 'application/json',
      transactionId: transactionId,
    }

    const data = {
      requestSource: REQUEST_SOURCE,
      merchantCode: MERCHANT_CODE,
      orderNumber,
      publicKey: PUBLIC_KEY,
      amount: amountDecimal,
    }

    const response = await ApiIzipay.post<IResponseToken>(
      '/security/v1/Token/Generate',
      data,
      {
        headers,
      },
    )
    console.log('RESPONSE', JSON.stringify(response.data, null, 2))
    return response.data
  }


  return {
    generateOrder,
    getTokenSession,
  }
}
