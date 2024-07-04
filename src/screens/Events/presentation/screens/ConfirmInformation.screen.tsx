import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { ScrollView, View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'
import FormInput from '../../../../components/form/FormInput'
import Card from '../../../../components/card'
import RadioButton from '../../../../components/radio/RadioButton'
import { useEffect, useRef, useState } from 'react'
import Button from '../../../../components/button'
import { useNavigation } from '@react-navigation/native'
import { usePayment } from '../../../../components/payment/usePayment'
import { EmbebedScreenIzipay } from '../../../../components/payment/iziPay.webview'
import useConfirmInformationInteractor from './ConfirmInformation.interactor'
import useIziPay from '../../../../hooks/useIziPay'

const schema = Yup.object()
  .shape({
    nroOrden: Yup.string().required('Este campo es obligatorio'),
    identifier: Yup.string().required('Este campo es obligatorio'),
    name: Yup.string().required('Este campo es obligatorio'),
    nroMtr: Yup.string().required('Este campo es obligatorio'),
    email: Yup.string().required('Este campo es obligatorio'),
    phone: Yup.string().required('Este campo es obligatorio'),
    isRememberUser: Yup.bool().required(),
  })
  .required()

const ConfirmInformationScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      nroOrden: '933330394',
      identifier: 'Aplicativo',
      name: 'Carolina Diana Salas Iñato',
      nroMtr: '0292929333',
      email: 'c.salas@usmp.com',
      phone: '946100600',
      isRememberUser: false,
    },
  })

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isVisibleIziPay, setIsVisibleIziPay] = useState(false)
  const navigation: any = useNavigation()

  const {
    fetchIziPay,
    dataOrderIziPay,
    tokenIziPay,
  } = useIziPay()

  const onSubmit = async () => {
    const { status } = await fetchIziPay('10')
    if (!status) return
    setIsVisibleIziPay(true)
  }

  return (
    <ScrollView flex={1} bg="white">
      <MenuHeaderV2 />
      <View height={20} />
      <Card.Shadow mx="1">
        <>
          <Paragraph color="primary" fontWeight="600">
            Pago en soles
          </Paragraph>
          <Paragraph>Concepto</Paragraph>

          <Paragraph fontWeight="600" color="black" fontSize={16}>
            Conferencia Ted "La relación individual"
          </Paragraph>

          <Paragraph>Total</Paragraph>
          <Paragraph fontSize={20} fontWeight="600" color="black">
            S/400
          </Paragraph>

          <View height={20} />
          <FormInput
            control={control}
            name="nroOrden"
            placeholder="Nro. de orden"
            errors={errors}
          />
          <View height={20} />
          <FormInput
            control={control}
            name="identifier"
            placeholder="Indetificador"
            errors={errors}
          />
          <View height={20} />
          <FormInput
            control={control}
            name="name"
            placeholder="Nombres y Apellidos"
            errors={errors}
          />
          <View height={20} />
          <FormInput
            control={control}
            name="nroMtr"
            placeholder="Nro de Matrícula"
            errors={errors}
          />
          <View height={20} />
          <FormInput
            control={control}
            name="email"
            placeholder="Correo institucional"
            errors={errors}
          />
          <View height={20} />
          <FormInput
            control={control}
            name="phone"
            placeholder="Celular"
            errors={errors}
          />
          <View height={20} />
        </>
      </Card.Shadow>

      <View px="1" py="1">
        <View flexDirection="row" justifyContent="center" pb="1.5">
          <RadioButton
            checked={isChecked}
            onPress={() => {
              setIsChecked((prev) => !prev)
              setValue('isRememberUser', !isChecked)
            }}
            text="Acepto los Términos y Condiciones"
          />
        </View>
        <Paragraph textAlign="center" fontSize={12} color="black">
          En caso los datos no sean los correctos deberá comunicarse con el
          responsable de Sistema de su Facultad
        </Paragraph>

        <View pt="2" pb="1">
          <Button
            title="Confirmar Datos"
            type="primary"
            onPress={onSubmit}
          />
        </View>
      </View>
      {isVisibleIziPay ? (
        <EmbebedScreenIzipay
          amount="10"
          token={tokenIziPay.current}
          transactionId={dataOrderIziPay.current.transactionId}
          orderNumber={dataOrderIziPay.current.orderNumber}
          currentTimeUnix={dataOrderIziPay.current.currentTimeUnix}
          onRequestClose={() => setIsVisibleIziPay(false)}
        />
      ) : null}
    </ScrollView>
  )
}
export default ConfirmInformationScreen
