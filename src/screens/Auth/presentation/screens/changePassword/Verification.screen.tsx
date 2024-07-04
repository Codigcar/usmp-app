import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ScrollView, View } from '../../../../../components/box'
import { Header } from '../../components'
import { Paragraph } from '../../../../../components/typhografic'
import FormInput from '../../../../../components/form/FormInput'
import { ProfileStackScreenProps } from '../../../../../routes/types'
import { IconEyesPassword, IconQuestion } from '../../../../../assets/icons'
import Button from '../../../../../components/button'
import useVerificationInteractor from './Verification.interactor'
import Loading from '../../../../../components/loading'

type IForm = {
  username: string
  password: string
}

const schema = Yup.object<IForm>()
  .shape({
    username: Yup.string().required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
  })
  .required()

const VerificationScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '76190791',
      password: '1234567'
    }
  })

  const navigation =
    useNavigation<ProfileStackScreenProps<'VerificationScreen'>['navigation']>()
  const [isVisiblePassword1, setIsVisiblePassword1] = useState(false)
  const { fetchVerificationAccess, isLoading } = useVerificationInteractor()

  const onSubmit = async ({ username, password }: IForm) => {
    const { status } = await fetchVerificationAccess(username, password)
    if (!status) return

    navigation.push('ChangePasswordScreen2', {
      username,
      currentPassword: password,
    })
  }

  return (
    <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }} bg="white">
      <View paddingHorizontal="1" bg="white" flex={1}>
        <Header onPressIconClose={navigation.goBack} />
        <View height={15} />
        <Paragraph fontWeight="600" color="black" fontSize={20}>
          Modifica tu clave de acceso{'\n'}actual
        </Paragraph>
        <View height={30} />
        <FormInput
          control={control}
          name="username"
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
          placeholder="Clave de acceso actual"
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

      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default VerificationScreen
