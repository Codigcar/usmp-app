import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from '../../components'
import { AuthStackScreenProps } from '../../../../../routes/types'
import View from '../../../../../components/box/View'
import Paragraph from '../../../../../components/typhografic/Paragraph'
import FormInput from '../../../../../components/form'
import Button from '../../../../../components/button'
import useRecoveryPasswordInteractor from './RecoveryPassword.interactor'
import Loading from '../../../../../components/loading'

type IForm = {
  email: string
}

const schema = Yup.object<IForm>()
  .shape({
    email: Yup.string().email().required(),
  })
  .required()

const RecoveryPasswordScreen = () => {
  const navigation =
    useNavigation<
      AuthStackScreenProps<'RecoveryPasswordScreen'>['navigation']
    >()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const { isLoading, fetchSendCodeOTP } = useRecoveryPasswordInteractor()

  const onSubmit = async ({ email }: IForm) => {
    const { status } = await fetchSendCodeOTP(email)
    if (!status) return
    navigation.push('CodeOTPScreen', { email })
  }

  return (
    <View bg="white" flex={1} paddingHorizontal="1">
      <Header onPressIconClose={navigation.goBack} />
      <View height={15} />
      <Paragraph fontWeight="bold" color="black" fontSize={20}>
        Restablecer contraseña
      </Paragraph>
      <Paragraph fontSize={14}>
        Ingresa tu correo institucional. Enviaremos un código con límite de
        tiempo de uso para que restablezcas tu contraseña
      </Paragraph>
      <View height={35} />
      <FormInput
        control={control}
        name="email"
        placeholder="Correo institucional"
        errors={errors}
      />
      <View flex={1} />
      <View pb="2">
        <Button
          disabled={!isValid}
          type={isValid ? 'primary' : 'disabled'}
          title="Enviar código"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      {isLoading ? <Loading /> : null}
    </View>
  )
}
export default RecoveryPasswordScreen
