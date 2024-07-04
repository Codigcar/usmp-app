import { useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation, useRoute } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Paragraph } from '../../../../../components/typhografic'
import { AuthStackScreenProps } from '../../../../../routes/types'
import { Header } from '../../components'
import View from '../../../../../components/box/View'
import Button from '../../../../../components/button'
import FormInput from '../../../../../components/form/FormInput'
import RecaptchaV2 from '../../../../../components/captcha'
import useCodeOTPInteractor from './CodeOTP.interactor'
import Loading from '../../../../../components/loading'

type IForm = {
  code1: string
  code2: string
  code3: string
  code4: string
  token: string
}

const schema = Yup.object().shape({
  code1: Yup.string().required(),
  code2: Yup.string().required(),
  code3: Yup.string().required(),
  code4: Yup.string().required(),
  token: Yup.string().required(),
})

const CodeOTPScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const refInput1 = useRef<TextInput>(null)
  const refInput2 = useRef<TextInput>(null)
  const refInput3 = useRef<TextInput>(null)
  const refInput4 = useRef<TextInput>(null)
  const {
    minutos,
    segundosRestantes,
    fetchRetrySendCodeOTP,
    encryptEmail,
    isLoading,
    resetTime,
    fetchValidateCode,
    nextInputRef,
  } = useCodeOTPInteractor()

  const navigation =
    useNavigation<AuthStackScreenProps<'CodeOTPScreen'>['navigation']>()
  const route = useRoute<AuthStackScreenProps<'CodeOTPScreen'>['route']>()
  const [tokenRecaptcha, setTokenRecaptcha] = useState('')

  const onVerifyRecaptcha = (token: string) => {
    setTokenRecaptcha(token)
    setValue('token', token, { shouldValidate: true, shouldDirty: true })
  }

  const retryAction = async () => {
    const status = await fetchRetrySendCodeOTP(route.params.email)
    if (!status) return
    resetTime()
  }

  const onSubmit = async ({ code1, code2, code3, code4 }: IForm) => {
    const codeOTP = `${code1}${code2}${code3}${code4}`
    const { status } = await fetchValidateCode(route.params.email, codeOTP)
    if (!status) return
    navigation.navigate('ConfirmNewPassword', {
      email: route.params.email,
      codeOTP,
    })
  }

  return (
    <View bg="white" flex={1} paddingHorizontal="1">
      <Header onPressIconClose={navigation.goBack} />
      <View height={15} />
      <Paragraph fontWeight="bold" color="black" fontSize={20}>
        Restablecer contraseña
      </Paragraph>
      <Paragraph>
        Ingresa el código enviado a tu correo{'\n'}institucional{' '}
        <Paragraph fontWeight="bold">
          {encryptEmail(route.params.email)}
        </Paragraph>
      </Paragraph>

      <View height={50} />

      {/* Código valido tienes: 00:10:00 minutos */}
      <Paragraph color="primary" textAlign="center" fontWeight="500">
        {minutos.toString().padStart(2, '0')}:
        {segundosRestantes.toString().padStart(2, '0')}
      </Paragraph>
      <View height={10} />

      <View flexDirection="row" justifyContent="space-around">
        <FormInput
          type="otp"
          control={control}
          name="code1"
          refInput={refInput1}
          errors={errors}
          nextInputRef={() => nextInputRef(refInput2)}
        />

        <FormInput
          type="otp"
          control={control}
          name="code2"
          refInput={refInput2}
          errors={errors}
          nextInputRef={() => nextInputRef(refInput3)}
        />

        <FormInput
          type="otp"
          control={control}
          name="code3"
          refInput={refInput3}
          errors={errors}
          nextInputRef={() => nextInputRef(refInput4)}
        />

        <FormInput
          type="otp"
          control={control}
          name="code4"
          refInput={refInput4}
          errors={errors}
        />
      </View>

      <View height={20} />

      <View flexDirection="row" justifyContent="center">
        <Paragraph color="black">¿No lo recibiste? </Paragraph>
        <TouchableOpacity onPress={retryAction}>
          <Paragraph fontWeight="bold" fontSize={14}>
            REINTENTAR
          </Paragraph>
        </TouchableOpacity>
      </View>

      <View height={40} />

      <RecaptchaV2
        isChecked={Boolean(tokenRecaptcha)}
        onVerify={onVerifyRecaptcha}
      />

      <View flex={1} />

      <View height={20} />

      <View pb="2">
        <Button
          disabled={!isValid}
          type={isValid ? 'primary' : 'disabled'}
          // type={'primary'}
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      {isLoading ? <Loading /> : null}
    </View>
  )
}

export default CodeOTPScreen
