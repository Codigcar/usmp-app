import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import View from '../../../../../components/box/View'
import { Paragraph } from '../../../../../components/typhografic'
import { Header } from '../../components'
import { AuthStackScreenProps } from '../../../../../routes/types'
import FormInput from '../../../../../components/form/FormInput'
import { TouchableOpacity } from 'react-native'
import {
  IconEyesPassword,
  IconValidError,
  IconValidSuccess,
} from '../../../../../assets/icons'
import { useState } from 'react'
import Button from '../../../../../components/button'
import useConfirmNewPasswordInteractor from './ConfirmNewPassword.interactor'

const rgxMinyMax = /^.{8,20}$/
const rgxNumero = /[0-9]/
const rgxLetraMayuscula = /[A-Z]/
const rgxCaracterEspecial = /[!@#$%^&*]/

type IForm = {
  password1: string
  password2: string
}

const schema = Yup.object<IForm>()
  .shape({
    password1: Yup.string().required('Este campo es obligatorio'),
    password2: Yup.string().required('Este campo es obligatorio'),
  })
  .required()

const ConfirmNewPassword = () => {
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false)
  const [isVisiblePassword2, setIsVisiblePassword2] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const navigation =
    useNavigation<AuthStackScreenProps<'ConfirmNewPassword'>['navigation']>()
  const route = useRoute<AuthStackScreenProps<'ConfirmNewPassword'>['route']>()
  const { fetchSetNewPassword } = useConfirmNewPasswordInteractor()

  const onSubmit = async (data: IForm) => {
    const { status } = await fetchSetNewPassword({
      email: route.params.email,
      code: route.params.codeOTP,
      password: data.password1,
      passwordConfirmation: data.password2,
    })
    if(!status) return
    navigation.replace('LoginScreen')
  }

  return (
    <View paddingHorizontal="1" bg="white" flex={1}>
      <Header onPressIconClose={navigation.goBack} />
      <View height={15} />
      <Paragraph fontWeight="bold" color="black" fontSize={20}>
        Restablecer contraseña
      </Paragraph>
      <Paragraph>
        Recuerda que debes ingresar una clave que{'\n'}no hayas utilizado las
        últimas 3 veces
      </Paragraph>
      <View height={30} />
      <FormInput
        control={control}
        name="password1"
        placeholder="Clave de acceso"
        errors={errors}
        isPassword={isVisiblePassword1}
        SuffixComponent={() => (
          <TouchableOpacity
            onPress={() => setIsVisiblePassword1(!isVisiblePassword1)}>
            <View pt="0.5">
              <IconEyesPassword />
            </View>
          </TouchableOpacity>
        )}
      />
      <View height={20} />
      <FormInput
        control={control}
        name="password2"
        placeholder="Repetir clave de acceso"
        errors={errors}
        isPassword={isVisiblePassword2}
        SuffixComponent={() => (
          <TouchableOpacity
            onPress={() => setIsVisiblePassword2(!isVisiblePassword2)}>
            <View pt="0.5">
              <IconEyesPassword />
            </View>
          </TouchableOpacity>
        )}
      />
      <View height={20} />
      <View pl="1">
        <Paragraph>Tu clave debe contener:</Paragraph>
        <View flexDirection="row" alignItems="center">
          {rgxMinyMax.test(watch('password1')) ? (
            <IconValidSuccess />
          ) : (
            <IconValidError />
          )}
          <Paragraph fontSize={12}>
            {' '}
            Mínimo entre 8 y 20 caracteres máximos
          </Paragraph>
        </View>
        <View flexDirection="row" alignItems="center">
          {rgxNumero.test(watch('password1')) ? (
            <IconValidSuccess />
          ) : (
            <IconValidError />
          )}
          <Paragraph fontSize={12}> Contener 1 número</Paragraph>
        </View>
        <View flexDirection="row" alignItems="center">
          {rgxLetraMayuscula.test(watch('password1')) ? (
            <IconValidSuccess />
          ) : (
            <IconValidError />
          )}
          <Paragraph fontSize={12}> 1 Letra mayúscula</Paragraph>
        </View>
        <View flexDirection="row" alignItems="center">
          {rgxCaracterEspecial.test(watch('password1')) ? (
            <IconValidSuccess />
          ) : (
            <IconValidError />
          )}
          <Paragraph fontSize={12}> 1 Caracter especial</Paragraph>
        </View>
        <View flexDirection="row" alignItems="center">
          {watch('password1') === watch('password2') ? (
            <IconValidSuccess />
          ) : (
            <IconValidError />
          )}
          <Paragraph fontSize={12}> Ambas claves coinciden</Paragraph>
        </View>
      </View>
      <View flex={1} />
      <View pb="2">
        <Button
          disabled={!isValid}
          type={isValid ? 'primary' : 'disabled'}
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}
export default ConfirmNewPassword
