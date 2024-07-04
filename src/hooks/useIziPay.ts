import { useRef, useState } from 'react'
import { NativeModules } from 'react-native'

import { usePayment } from '../components/payment/usePayment'
import useDataOrderDynamic from '../components/payment/useDataOrderDynamic'
import { MERCHANT_CODE, PUBLIC_KEY } from '../components/payment/keys'

const useIziPay = () => {
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
      return { status: false }
    }
  }

  const fetchIziPaySDK = async() => {
    const currentTimeUnix = Math.floor(Date.now()) * 1000
    const transactionId = currentTimeUnix.toString().slice(0, 14)
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString()

    try {
      const { IziPayModule } = NativeModules
      const data = await IziPayModule.launchSdkActivity(
        'TEST', // environment
        'pay', // action
        // 'VErethUtraQuxas57wuMuquprADrAHAb', // publicKey
        PUBLIC_KEY, // publicKey
        // '171760988622601', // transactionId
        transactionId, // transactionId
        MERCHANT_CODE, // merchantCode
        '', // facilitatorCode
        // '1717609934', // orderNumber
        orderNumber, // orderNumber
        'PEN', // currency
        '1.00', // amount
        'card', // payMethod
        'mobile', // channel
        'autorize', // processType
        'pruebemerchantId', // merchantBuyerId
        // '171760988622600', // dateTime
        String(currentTimeUnix), // dateTime
        '', // cardToken
        'Enrrique', // firstName
        'Pariasca', // lastName
        'epc@gmail.com', // email
        '999666999', // phoneNumber
        'av prueba 123', // street
        'Lima', // city
        'Lima', // state
        'PE', // country
        '00001', // postalCode
        'DNI', // documentType
        '12345621', // document
        'ESP', // language
        true, // isAmountLabelVisible
        true, // isLangControlVisible
        true, // showMessageResult
        'green', // theme
        '#2D2C58', // payButtonBackgroundColor
        '#2D2C58', // textInputBorderColor
        '#2D2C58', // textInputPlaceholderTextColor
        'https://logowik.com/content/uploads/images/shopping-cart5929.jpg', // logo
        '', // urlIpn
      )
      console.log("🚀 --------------------------------------------------------🚀")
      console.log("🚀 ~ file: useIziPay.ts:68 ~ fetchIziPaySDK ~ data:", data)
      console.log("🚀 --------------------------------------------------------🚀")
    } catch (error) {
      console.error("🚀 ----------------------------------------------------------🚀")
      console.error("🚀 ~ file: useIziPay.ts:72 ~ fetchIziPaySDK ~ error:", error)
      console.error("🚀 ----------------------------------------------------------🚀")
    }
  }

  return {
    fetchIziPay,
    dataOrderIziPay,
    tokenIziPay,
    fetchIziPaySDK
  }
}

export default useIziPay
