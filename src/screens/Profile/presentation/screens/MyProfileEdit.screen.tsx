import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'

import FormInput from '../../../../components/form/FormInput'
import { ScrollView, View } from '../../../../components/box'
import { HeaderAvatar } from '../components'
import DropdownComponent from '../../../../components/input/dropdown'
import Button from '../../../../components/button'
import useMyProfileEditInteractor from './MyProfileEdit.interactor'
import Ribbon from '../../../../components/ribbon'
import { convertToDataDropdown } from '../../../Courses/infrastructure/utils'
import { ProfileStackScreenProps } from '../../../../routes/types'
import Toast from 'react-native-toast-message'

type IForm = {
  email: string,
  phone: string
  street: string
  provinceId: number
  departamentId: number
  districtId: number
}

const schema = Yup.object()
  .shape({
    email: Yup.string().required('Debe ingresar todos los campos'),
    phone: Yup.string().required('Debe ingresar todos los campos'),
    street: Yup.string().required('Debe ingresar todos los campos'),
    provinceId: Yup.number().required('Debe ingresar todos los campos'),
    departamentId: Yup.number().required('Debe ingresar todos los campos'),
    districtId: Yup.number().required('Debe ingresar todos los campos'),
  })
  .required()

const MyProfileEditScreen: React.FC = () => {
  const {
    params: { profileEntity },
  } = useRoute<ProfileStackScreenProps<'MyProfileEditScreen'>['route']>()
  const navigation: any = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      street: profileEntity.data.address,
      email: profileEntity.data.personalEmail,
      phone: profileEntity.data.phone,
      provinceId: profileEntity.data.province.id,
      departamentId: profileEntity.data.department.id,
      districtId: profileEntity.data.district.id,
    }
  })

  const {
    getDepartaments,
    getProvinces,
    getDistricts,
    isLoading,
    onChangeDepartaments,
    onChangeProvince,
    onChangeDistrict,
    valueDropdownDepartaments,
    valueDropdownDistrict,
    valueDropdownProvince,
    fetchUpdateProfile
  } = useMyProfileEditInteractor()

  const onSubmit = async(body: IForm) => {
    const updated = await fetchUpdateProfile({
      personalEmail: body.email,
      Phone: body.phone,
      DistrictId: body.districtId,
      Address: body.street
    })

    Toast.show({
      type: 'success',
      text1: '¡Datos actualizados!',
      text2: 'Ha actualizado su correo personal y celular con éxito',
    })
    navigation.pop()
  }

  return (
    <ScrollView flex={1} bg="white">
      <Ribbon.base title="Mi Perfil" isLoading={isLoading} />
      <View px="1" flex={1}>
        <View height={20} />

        <HeaderAvatar />

        <View height={25} />

        <FormInput
          control={control}
          name="email"
          placeholder="Correo personal"
          errors={errors}
        />
        <View height={25} />
        <FormInput
          control={control}
          name="phone"
          placeholder="Celular"
          errors={errors}
        />
        <View height={25} />

        {getDepartaments && (
          <DropdownComponent
            placeholder="Departamento"
            data={
              convertToDataDropdown(getDepartaments?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            defaultValue={valueDropdownDepartaments}
            onChange={(item) => {
              setValue('departamentId', item)
              onChangeDepartaments(item)
            }}
          />
        )}
        <View height={25} />
        {getProvinces && (
          <DropdownComponent
            placeholder="Provincia"
            data={
              convertToDataDropdown(getProvinces?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            defaultValue={valueDropdownProvince}
            onChange={(item) => {
              setValue('provinceId', item)
              onChangeProvince(item)
            }}
          />
        )}
        <View height={25} />
        {getDistricts && (
          <DropdownComponent
            placeholder="Distrito"
            data={
              convertToDataDropdown(getDistricts?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            defaultValue={valueDropdownDistrict}
            onChange={(item) => {
              setValue('districtId', item)
              onChangeDistrict(item)
            }}
          />
        )}
        <View height={25} />

        <FormInput
          control={control}
          name="street"
          placeholder="Calle / Av / Jirón / Nro"
          errors={errors}
        />

        <View height={60} />

        <View pb="2">
          <Button
            disabled={!isValid}
            type={isValid ? 'primary' : 'disabled'}
            title="Continuar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default MyProfileEditScreen
