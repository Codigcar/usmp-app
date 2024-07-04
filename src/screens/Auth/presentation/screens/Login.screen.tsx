import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TouchableOpacity } from 'react-native'
import * as Yup from 'yup'

import View from '../../../../components/box/View'
import FormInput from '../../../../components/form/FormInput'
import RadioButton from '../../../../components/radio/RadioButton'
import Button from '../../../../components/button'
import { IconEyesPassword, IconQuestion } from '../../../../assets/icons'
import Paragraph from '../../../../components/typhografic/Paragraph'
import { Header } from '../components'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../libraries-implementation/redux/store'
import Loading from '../../../../components/loading'
import { fetchUsers } from '../../infrastructure/adapters/thunks/login.thunk'
import { useAuth } from '../../../../context/auth.provider'
import useLoginInteractor from './Login.interactor'
import { SafeAreaView } from '../../../../components/box'

type IForm = {
  user: string
  password: string
  isRememberUser: boolean
}

const schema = Yup.object<IForm>()
  .shape({
    user: Yup.string().required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
    isRememberUser: Yup.bool().required(),
  })
  .required()

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      user: '72371133',
      password: 'Inicial@02',
      isRememberUser: false,
    },
  })

  const dispatch = useAppDispatch()
  // const isLoading = useAppSelector((state) => state.login.isLoading)
  const navigation = useNavigation<any>()
  const [isChecked, setIsChecked] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
  const { fetchLogin, isLoading } = useLoginInteractor()

  const onSubmit = async ({ user, password, isRememberUser }: IForm) => {
    // await dispatch(fetchUsers({ username: user, password }))
    const { status } = await fetchLogin({ username: user, password })
    if (!status) return
    navigation.navigate('HomeStackScreen', { screen: 'HomeScreen' })
  }

  return (
    <View flex={1} paddingHorizontal="1" bg="white">
      <Header onPressIconClose={navigation.goBack} />
      <View height={50} />
      <Paragraph fontWeight="bold" fontSize={28} color="black" lineHeight={36}>
        Bienvenido,
      </Paragraph>
      <View height={15} />
      <FormInput
        control={control}
        name="user"
        placeholder="Usuario"
        errors={errors}
        SuffixComponent={() => (
          <View pt="0.25">
            <IconQuestion width={16} height={16} />
          </View>
        )}
      />
      <View height={20} />
      <FormInput
        control={control}
        name="password"
        placeholder="Clave de acceso"
        errors={errors}
        isPassword={isPassword}
        SuffixComponent={() => (
          <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
            <View pt="0.5">
              <IconEyesPassword />
            </View>
          </TouchableOpacity>
        )}
      />
      <View height={20} />
      <View pl="0.75">
        <RadioButton
          checked={isChecked}
          onPress={() => {
            setIsChecked((prev) => !prev)
            setValue('isRememberUser', !isChecked)
          }}
        />
      </View>
      <View height={25} />
      <TouchableOpacity
        onPress={() => navigation.push('RecoveryPasswordScreen')}>
        <Paragraph textAlign="center" fontWeight="bold" fontSize={11}>
          ¿OLVIDASTE TU CLAVE?
        </Paragraph>
      </TouchableOpacity>
      <View flex={1} />
      <View pb="2">
        <Button
          disabled={!isValid}
          type={isValid ? 'primary' : 'disabled'}
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {isLoading ? <Loading /> : null}
    </View>
  )
}
export default LoginScreen
