import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ScrollView, View } from '../../../components/box'
import Button from '../../../components/button'
import Card from '../../../components/card'
import Separator from '../../../components/separator'
import { Paragraph } from '../../../components/typhografic'
import { MenuHeaderV2 } from '../../../containers'
import { EmbebedScreenIzipay } from '../../../components/payment/iziPay.webview'
import useIziPay from '../../../hooks/useIziPay'
import { useAuth } from '../../../context'
import { HomeStackScreenProps } from '../../../routes/types'
import { PaymentsEntityData } from '../domain/entity/payments.entity'
import CDateTime from '../../../libraries-implementation/dateTime'
import moment from 'moment'

const PaymentDetailScreen: React.FC = () => {
  const { params } =
    useRoute<HomeStackScreenProps<'PaymentDetailScreen'>['route']>()

  const [isVisibleIziPay, setIsVisibleIziPay] = useState(false)
  const [listToPay, setListToPay] = useState<PaymentsEntityData[]>(params?.listToPay)
  const [getTotal, setGetTotal] = useState("")
  const [moraTotal, setMoraTotal] = useState(0)
  const value = useRef("")

  const { fetchIziPay, dataOrderIziPay, tokenIziPay } = useIziPay()
  const { user } = useAuth()

  const navigation:any = useNavigation()

  const onSubmit = async () => {
    const { status } = await fetchIziPay('10')
    if (!status) return
    setIsVisibleIziPay(true)
    // navigation.push("PaymentResumenScreen", { listToPay: params?.listToPay })
  }

  const removeListToPay = (item: PaymentsEntityData) => {
    setListToPay(listToPay.filter((x) => x !== item))
  }

  const getSumTotal = useCallback(() => {
    let total = 0
    let moraTotal = 0
    listToPay.forEach((x) => {
      total += Number(x.amount)
      moraTotal += Number(x.lateAmount)
    })

    setGetTotal(String(total))
    setMoraTotal(moraTotal)
    value.current = String(total)
    return getTotal
  }, [listToPay])

  useEffect(() => {
    getSumTotal()
  }, [listToPay])

  return (
    <ScrollView flex={1} bg="white">
      <MenuHeaderV2 />

      <View height={20} />

      <View px="1" flex={1}>
        <View flex={1}>
          {listToPay.map((item) => {
            return (
              <Card.Shadow key={item.id}>
                <>
                  <View>
                    <View
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center">
                      <Paragraph color="black" fontWeight="600">
                        {item.description}
                      </Paragraph>
                      <TouchableOpacity
                        onPress={() => removeListToPay(item)}
                        hitSlop={10}>
                        <Paragraph color="gray-900" fontSize={13}>
                          X
                        </Paragraph>
                      </TouchableOpacity>
                    </View>
                    <View flexDirection="row" alignItems="center" pl="0.25">
                      {item?.statuses === 'expired' ? (
                        <>
                          <View
                            height={8}
                            width={8}
                            bg="danger"
                            borderRadius="full"
                          />
                          <View width={6} />
                        </>
                      ) : null}
                      <Paragraph fontSize={10}>
                        {
                          CDateTime.getInstance().getMetaDataByDay(
                            moment(item?.expiredAt, 'MM/DD/YYYY HH:mm:ss'),
                          ).DDMMMAAAA
                        }
                      </Paragraph>
                    </View>
                  </View>

                  <View flexDirection="row">
                    <View pr="2.5" pt="0.25">
                      <Paragraph>Nro.Doc:</Paragraph>
                      <Paragraph>{user?.code}</Paragraph>
                    </View>
                    <View>
                      <Paragraph>Período</Paragraph>
                      <Paragraph>{item.period}</Paragraph>
                    </View>
                  </View>

                  <View py="0.25">
                    <Separator />
                  </View>

                  <View
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <View pt="0.25">
                      <Paragraph>Monto:</Paragraph>
                      <Paragraph>{item.moneyType} {item.amount}</Paragraph>
                    </View>
                    <View>
                      <Paragraph>Mora:</Paragraph>
                      <Paragraph>{item.moneyType} {item.lateAmount}</Paragraph>
                    </View>
                    <View>
                      <Paragraph color="primary">Total:</Paragraph>
                      <Paragraph fontWeight="600" color="black">
                        {item.moneyType} {item.amount}
                      </Paragraph>
                    </View>
                  </View>
                </>
              </Card.Shadow>
            )
          })}
        </View>
      </View>
      <View flex={1} />

      <View
        px="1"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <View>
          <Paragraph>Mora Total:</Paragraph>
          <Paragraph>{listToPay?.[0]?.moneyType} {moraTotal}</Paragraph>
        </View>
        <View>
          <Paragraph color="primary">Total</Paragraph>
          <Paragraph color="black" fontWeight="600" fontSize={18}>
          {listToPay?.[0]?.moneyType} {getTotal}
          </Paragraph>
        </View>
      </View>

      <View py="1" px="1">
        <Button title="Ir a pagar" type="primary" onPress={onSubmit} />
      </View>

      {isVisibleIziPay ? (
        <EmbebedScreenIzipay
          // amount={getTotal}
          // amount={value.current}
          amount={"10"}
          token={tokenIziPay.current}
          transactionId={dataOrderIziPay.current.transactionId}
          orderNumber={dataOrderIziPay.current.orderNumber}
          currentTimeUnix={dataOrderIziPay.current.currentTimeUnix}
          onRequestClose={() => {
            setIsVisibleIziPay(false)
            navigation.push("PaymentResumenScreen", { listToPay: params?.listToPay })
          }}
        />
      ) : null}
    </ScrollView>
  )
}

export default PaymentDetailScreen
