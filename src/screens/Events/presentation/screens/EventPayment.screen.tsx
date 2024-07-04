import { useEffect, useRef, useState } from 'react'
import { usePayment } from '../../../../components/payment/usePayment'
import { View } from '../../../../components/box'
import { EmbebedScreenIzipay } from '../../../../components/payment/iziPay.webview'

const MONTO = '10'

const EventPaymentScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const dataOrder = useRef<any>()
  const token = useRef<any>()
  const { generateOrder, getTokenSession } = usePayment()

  useEffect(() => {
    const getDataOrder = generateOrder()
    dataOrder.current = getDataOrder
    getTokenSession(getDataOrder.transactionId, getDataOrder.orderNumber, MONTO)
      .then((data) => {
        token.current = data.response.token
        setModalVisible(true)
      })
      .catch(() => console.error('hubo error'))
  }, [])

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      {modalVisible ? (
        <EmbebedScreenIzipay
          amount={MONTO}
          token={token.current}
          transactionId={dataOrder.current.transactionId}
          orderNumber={dataOrder.current.orderNumber}
          currentTimeUnix={dataOrder.current.currentTimeUnix}
        />
      ) : null}
    </View>
  )
}

export default EventPaymentScreen
