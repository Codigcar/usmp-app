import React, { useEffect, useRef, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { MERCHANT_CODE, ORDER_CURRENCY, PUBLIC_KEY } from '../payment/keys'
import useDataOrderDynamic from './useDataOrderDynamic'
import { usePayment } from './usePayment'
interface Props {
  url?: string
  amount: string
  onRequestClose?: () => void
  token: string
  currentTimeUnix: number
  transactionId: string
  orderNumber: string
}

export const EmbebedScreenIzipay = ({
  amount,
  onRequestClose,
  currentTimeUnix,
  transactionId,
  orderNumber,
  token,
}: Props) => {

  const INJECTED_JAVASCRIPT = ` (function() {   
        window.addEventListener('message', function(event) {     
        window.ReactNativeWebView.postMessage(event.data) }) 
    })(); `

  const handleWebViewMessage = (event: any) => {
    console.log("🚀 ----------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: iziPay.webview.tsx:33 ~ handleWebViewMessage ~ event:",JSON.stringify(event))
    console.log("🚀 ~ file: iziPay.webview.tsx:33 ~ handleWebViewMessage XD ~ event:",JSON.stringify(event.nativeEvent.data))
    console.log("🚀 ----------------------------------------------------------------------🚀")
    // const data = JSON.parse(event.nativeEvent.data)
    // console.log(data)
  }

  const config = {
    transactionId: transactionId,
    action: 'pay',
    merchantCode: MERCHANT_CODE,
    order: {
        orderNumber: orderNumber,
        currency: ORDER_CURRENCY,
        amount: amount,
        processType: 'AT',
        merchantBuyerId: 'mc1768x',
        dateTimeTransaction: currentTimeUnix
    }
  }   
  console.log("🚀 -------------------------------------------------🚀")
  console.log("🚀 ~ file: iziPay.webview.tsx:63 ~ config:", config)
  console.log("🚀 -------------------------------------------------🚀")

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title></title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js"></script>
      </head>
      <body>
        <div id='your-iframe-payment'></div>
        <pre id="payment-message"></pre>
        <script>
        // alert(JSON.stringify("${token}"))
        const iziConfig = {
            // publicKey: "${PUBLIC_KEY}",
            config: {
                transactionId: "${transactionId}",
                action: 'pay',
                merchantCode: "${MERCHANT_CODE}",
                order: {
                    orderNumber: "${orderNumber}",
                    currency: "${ORDER_CURRENCY}",
                    amount: "${amount}",
                    processType: 'AT',
                    merchantBuyerId: 'mc1768x',
                    dateTimeTransaction: "${currentTimeUnix}"
                },
                billing: {
                    firstName: 'Darwin',
                    lastName: 'Paniagua',
                    email: 'demo@izipay.pe',
                    phoneNumber: '989339999',
                    street: 'calle el demo',
                    city: 'lima',
                    state: 'lima',
                    country: 'PE',
                    postalCode: '00001',
                    document: '12345678',
                    documentType: 'DNI',
                },
                render: {
                    typeForm: 'embedded',
                    container: '#your-iframe-payment',
                    showButtonProcessForm: true,
                    redirectUrls:{
                        onSuccess:"https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
                        onError:"https://127.0.0.1:5501/onError",
                        onCancel:"https://127.0.0.1:5501/public/index.html"
                    }
                },
                urlRedirect:'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
                urlIPN: 'https://api.app.usmp.pappstest.com/api/v1/izipay/webhook',
            },
        };

        function callbackResponsePayment(response) {   
          window.ReactNativeWebView.postMessage(JSON.stringify(response))
          window.addEventListener('message', function(event) {     
              window.ReactNativeWebView.postMessage(JSON.stringify(event))
            }
        )}

        const handleLoadForm = () => {
            try {
                const izi = new Izipay({
                    publicKey: iziConfig?.publicKey,
                    config: iziConfig?.config,
                });

                izi &&
                izi.LoadForm({
                    authorization: "${token}",
                    keyRSA: 'RSA',
                    callbackResponse: callbackResponsePayment,
                });

            } catch (error) {
                alert(JSON.stringify(error))
                console.log(error.message, error.Errors, error.date);
                window.ReactNativeWebView.postMessage(JSON.stringify(error))
            }
        };

        setTimeout(() => {
            handleLoadForm()
          }, 500)

        </script>
      </body>
    </html>
    `
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '100%',
            height: '100%',
          }}>
          <WebView
            source={{ html: HTML }}
            style={{ flex: 1, backgroundColor: 'white' }}
            originWhitelist={['*']}
            javaScriptEnabledAndroid={true}
            javaScriptEnabled={true}
            bounces={false}
            automaticallyAdjustContentInsets={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent
              console.warn('WebView error: ', nativeEvent)
            }}
            // injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={handleWebViewMessage}
            onNavigationStateChange={(event:any) => {
              console.log("🚀 ------------------------------------------------🚀")
              console.log("🚀 ~ file: iziPay.webview.tsx:208 ~ event:", JSON.stringify(event))
              console.log("🚀 ------------------------------------------------🚀")
            }}
            // onMessage={(event) => {
            //     console.log({ event })
            // }}
          />
          <TouchableOpacity
            onPress={() => {
              // setModalVisible(!modalVisible);
              onRequestClose?.()
            }}>
            <Text style={{ textAlign: 'center', marginTop: 10, color: 'blue' }}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
