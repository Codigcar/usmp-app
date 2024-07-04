import { useState } from 'react'
import { ScrollView, View } from '../../../components/box'
import Ribbon from '../../../components/ribbon'
import { Paragraph } from '../../../components/typhografic'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HomeStackScreenProps } from '../../../routes/types'
import { PaymentsEntityData } from '../domain/entity/payments.entity'
import { TouchableOpacity } from 'react-native'
import { IconDownload, IconTriangleBottom } from '../../../assets/icons'
import CDateTime from '../../../libraries-implementation/dateTime'
import moment from 'moment'
import Separator from '../../../components/separator'
import Card from '../../../components/card'
import Button from '../../../components/button'

const POSTPAGO = {
  code: '00',
  message: 'OK',
  messageUser: 'Operación exitosa',
  messageUserEng: 'Successful',
  response: {
    codeAuth: 'S21428',
    referenceNumber: '0038692',
    merchantCode: '4004345',
    currency: 'PEN',
    amount: '1.99',
    orderNumber: '1717989905',
    dateTransaction: '20240609',
    timeTransaction: '222657',
    payMethod: 'CARD',
    card: {
      brand: 'VS',
      pan: '497010******0055',
      save: false,
    },
    billing: {
      firstName: 'Juan',
      lastName: 'Wick Quispe',
      email: 'jwickq@izi.com',
      phoneNumber: '958745896',
      street: 'Av. Jorge Chávez 275',
      city: 'Lima',
      state: 'Lima',
      country: 'PE',
      postalCode: '00001',
      documentType: 'DNI',
      document: '12345678',
      companyName: '',
    },
    uniqueId: '449890539',
    signature: 'gKLq++LMMLhRW+2MDWehDCql/1D11YN7nmealbod+ow=',
    payloadHttp:
      '{"code":"00","message":"OK","messageUser":"Operación exitosa","messageUserEng":"Successful","response":{"codeAuth":"S21428","referenceNumber":"0038692","merchantCode":"4004345","currency":"PEN","amount":"1.99","orderNumber":"1717989905","dateTransaction":"20240609","timeTransaction":"222657","idLogMPI":0,"payMethod":"CARD","card":{"brand":"VS","pan":"497010******0055","save":false},"billing":{"firstName":"Juan","lastName":"Wick Quispe","email":"jwickq@izi.com","phoneNumber":"958745896","street":"Av. Jorge Chávez 275","city":"Lima","state":"Lima","country":"PE","postalCode":"00001","documentType":"DNI","document":"12345678","companyName":""},"uniqueId":"449890539"}}',
  },
}

const PaymentResumenScreen: React.FC = () => {
  const { params } =
    useRoute<HomeStackScreenProps<'PaymentResumenScreen'>['route']>()
  const listToPay = params?.listToPay
  const navigation: any = useNavigation()

  const [showDetails, setShowDetails] = useState(false)
  const onToggle = () => {
    setShowDetails(!showDetails)
  }

  const METADATA = [
    {
      title: 'Nombres y Apellidos del comprador',
      body: `${POSTPAGO.response.billing.firstName} ${POSTPAGO.response.billing.lastName}`,
    },
    {
      title: 'Producto',
      body: POSTPAGO.response.card.brand,
    },
    {
      title: 'Moneda',
      body: POSTPAGO.response.currency,
    },
    {
      title: 'Nro. de pedido',
      body: POSTPAGO.response.orderNumber,
    },
    {
      title: 'Nro de Tarjeta',
      body: POSTPAGO.response.card.pan,
    },
    {
      title: 'Nombre del tarjeta habiente',
      body: `${POSTPAGO.response.billing.firstName} ${POSTPAGO.response.billing.lastName}`,
    },
    {
      title: 'Correo institucional',
      body: POSTPAGO.response.billing.email,
    },
    {
      title: 'Celular',
      body: POSTPAGO.response.billing.phoneNumber,
    },
  ]

  return (
    <ScrollView bg="white">
      <Ribbon.base title="Resumen de Pago" />
      <Card.Shadow mt="1" mx="1">
        <>
          <Paragraph color="primary" fontWeight="600">
            Operación exitosa en Soles
          </Paragraph>
          <Paragraph fontSize={10}>Concepto</Paragraph>
          <View
            pt="0.5"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Paragraph
              color="black"
              fontWeight="600">{`Pago de ${listToPay.length} recibo(s)`}</Paragraph>
            <View flexDirection="row" alignItems="center">
              <TouchableOpacity onPress={onToggle} hitSlop={5}>
                <Paragraph color="primary" fontSize={8} fontWeight="600">
                  VER DETALLE
                </Paragraph>
              </TouchableOpacity>
              <View width={5} />
              <IconTriangleBottom fill="#BD1714" stroke="#BD1714" />
            </View>
          </View>

          {/* list */}
          {showDetails ? (
            <View>
              {listToPay.map((item) => {
                return (
                  <View
                    key={item.id}
                    my="0.5"
                    borderWidth={1}
                    borderColor="gray-900"
                    borderRadius="xl"
                    p="0.5">
                    <Paragraph color="black" fontWeight="600" fontSize={12}>
                      {item?.description}
                    </Paragraph>
                    <Paragraph fontSize={12}>Periodo {item?.period}</Paragraph>
                    <View
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center">
                      <View flexDirection="row" alignItems="center">
                        <Paragraph fontSize={10}>
                          Vencido: 06 Sep, 2023
                          {/* {item?.statusesName}
                      {
                        CDateTime.getInstance().getMetaDataByDay(
                          moment(item?.expiredAt, 'MM/DD/YYYY HH:mm:ss'),
                        ).DDMMMAAAA
                      } */}
                        </Paragraph>
                      </View>
                      <View flexDirection="row">
                        <Paragraph color="primary">Total:</Paragraph>
                        <View width={5} />
                        <Paragraph color="black" fontWeight="600">
                          {item?.moneyType} {item?.amount}
                        </Paragraph>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          ) : null}

          {/*  */}

          {/* fecha */}
          <View flex={1} justifyContent="space-between" flexDirection="row">
            <View>
              <Paragraph fontSize={10}>Fecha y hora</Paragraph>
              <Paragraph>20/10/23</Paragraph>
            </View>
            <View>
              <Paragraph fontSize={10}>Total</Paragraph>
              <Paragraph>20/10/23</Paragraph>
            </View>
          </View>
          {/*  */}

          {METADATA.map((item) => (
            <View>
              <View height={10} />
              <Paragraph fontSize={10} color="black-300">
                {item.title}
              </Paragraph>
              <Paragraph color="black">{item.body}</Paragraph>
              <View height={5} />
              <Separator />
            </View>
          ))}
        </>
      </Card.Shadow>
      <View px="1" pb="1">
        <View flexDirection="row" justifyContent="center" py="1.5">
          <IconDownload />
          <View width={15} />
          <Paragraph fontWeight="600">DESCARGAR COPIA</Paragraph>
        </View>
        <Paragraph textAlign="center">
          Hemos enviado un correo con la confirmación de pago a su correo
          electrónico
        </Paragraph>
        <View py="1">
          <Button
            title="Volver"
            onPress={() => {
              navigation.replace('PaymentsScreen')
            }}
            type="primary"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default PaymentResumenScreen
