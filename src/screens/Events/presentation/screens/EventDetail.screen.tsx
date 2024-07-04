import { useRef } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {
  IconCalendar,
  IconFavorite,
  IconLocalization,
  IconWorld,
} from '../../../../assets/icons'
import { ScrollView, View } from '../../../../components/box'
import Button from '../../../../components/button'
import Image from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'
import FormInput from '../../../../components/form/FormInput'
import { useNavigation } from '@react-navigation/native'
import { EventStackScreenProps } from '../../../../routes/types'

const schema = Yup.object()
  .shape({
    name: Yup.string().required('Este campo es obligatorio'),
    lastName: Yup.string().required('Este campo es obligatorio'),
    nro: Yup.string().required('Este campo es obligatorio'),
    phone: Yup.string().required('Este campo es obligatorio'),
    email: Yup.string().required('Este campo es obligatorio'),
  })
  .required()

const EventDetailScreen: React.FC = () => {
  const actionSheetRef: any = useRef(null)
  const navigation =
    useNavigation<EventStackScreenProps<'EventDetailScreen'>['navigation']>()

  const onOpen = () => {
    actionSheetRef.current?.show()
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'Carolina Diana',
      lastName: 'Salas Iñatos',
      nro: '029292933',
      phone: '764342323',
      email: 'c.salas@usmp.com',
    },
  })

  return (
    <ScrollView bg="white" flex={1}>
      <View width="100%">
        <Image
          source={require('../../../../assets/images/bg-rol-student.png')}
          style={{
            width: '100%',
            height: 291,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
      <View px="1" flex={1}>
        <View height={10} />

        <Paragraph color="primary" fontSize={20} fontWeight="600">
          Conferencia Ted "La relación individual"
        </Paragraph>
        <Paragraph>(Charla)</Paragraph>

        <View height={15} />

        <View flexDirection="row">
          <IconLocalization />
          <Paragraph fontWeight="600"> salon de eventos USMP.</Paragraph>
        </View>
        <View flexDirection="row">
          <IconCalendar />
          <Paragraph fontWeight="600"> 12 Oct 2023</Paragraph>
        </View>
        <View flexDirection="row">
          <IconWorld />
          <Paragraph fontWeight="600"> https://usmp.edu.pe/eventos</Paragraph>
        </View>

        <View height={15} />

        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Paragraph fontSize={16} fontWeight="600" color="black">
            Costo: S/500
          </Paragraph>
          <IconFavorite stroke="#BD1714" />
        </View>

        <View height={15} />

        <Paragraph>
          Aliquip incididunt ullamco voluptate ipsum. Laborum adipisicing nulla
          in deserunt sint amet exercitation minim aute anim laborum sunt ex
          officia. Laboris consectetur reprehenderit quis officia commodo dolore
          enim dolore tempor nostrud veniam. Nostrud sunt quis Lorem nisi ex.
        </Paragraph>
        <Paragraph>
          Aliquip incididunt ullamco voluptate ipsum. Laborum adipisicing nulla
          in deserunt sint amet exercitation minim aute anim laborum sunt ex
          officia. Laboris consectetur reprehenderit quis officia commodo dolore
          enim dolore tempor nostrud veniam. Nostrud sunt quis Lorem nisi ex.
        </Paragraph>
        <Paragraph>
          Aliquip incididunt ullamco voluptate ipsum. Laborum adipisicing nulla
          in deserunt sint amet exercitation minim aute anim laborum sunt ex
          officia. Laboris consectetur reprehenderit quis officia commodo dolore
          enim dolore tempor nostrud veniam. Nostrud sunt quis Lorem nisi ex.
        </Paragraph>
        <Paragraph>
          Aliquip incididunt ullamco voluptate ipsum. Laborum adipisicing nulla
          in deserunt sint amet exercitation minim aute anim laborum sunt ex
          officia. Laboris consectetur reprehenderit quis officia commodo dolore
          enim dolore tempor nostrud veniam. Nostrud sunt quis Lorem nisi ex.
        </Paragraph>

        <View flex={1} />

        <ActionSheet ref={actionSheetRef}>
          <View pt="2" px="1">
            <Paragraph color="primary" fontSize={20} fontWeight="600">
              Inscripción
            </Paragraph>
            <View height={20} />
            <FormInput
              control={control}
              name="name"
              placeholder="Nombres"
              errors={errors}
            />
            <View height={10} />
            <FormInput
              control={control}
              name="lastName"
              placeholder="Apellidos"
              errors={errors}
            />
            <View height={10} />
            <FormInput
              control={control}
              name="nro"
              placeholder="Nro de Matrícula"
              errors={errors}
            />
            <View height={10} />
            <FormInput
              control={control}
              name="phone"
              placeholder="Celular"
              errors={errors}
            />
            <View height={10} />
            <FormInput
              control={control}
              name="email"
              placeholder="Correo Institucional"
              errors={errors}
            />
            <View height={10} />
            <View py="1">
              <Button
                title="Confirmar"
                onPress={() => navigation.push('ConfirmInformationScreen')}
                type="primary"
              />
            </View>
          </View>
        </ActionSheet>

        <View py="1">
          <Button title="Inscribirme" onPress={onOpen} type="primary"></Button>
        </View>
      </View>
    </ScrollView>
  )
}

export default EventDetailScreen
