import { ScrollView, View } from '../../../../components/box'
import Ribbon from '../../../../components/ribbon'
import { Paragraph } from '../../../../components/typhografic'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import ActionSheet from 'react-native-actions-sheet'
import { yupResolver } from '@hookform/resolvers/yup'

import { BookingStackScreenProps } from '../../../../routes/types'
import Image from '../../../../components/image'
import {
  IconCalendar,
  IconPencil,
  IconReloj,
  IconUbication,
} from '../../../../assets/icons'
import CDateTime from '../../../../libraries-implementation/dateTime'
import RadioButton from '../../../../components/radio/RadioButton'
import Separator from '../../../../components/separator'
import Button from '../../../../components/button'
import FormInput from '../../../../components/form/FormInput'
import useBookingDetailInteractor from './BookingDetail.interactor'
import Toast from 'react-native-toast-message'
import { TouchableOpacity } from 'react-native'

const schema = Yup.object()
  .shape({
    motivo: Yup.mixed().nullable(),
  })
  .required()

const BookingDetailScreen: React.FC = () => {
  const route =
    useRoute<BookingStackScreenProps<'BookingDetailScreen'>['route']>()
  const navigation =
    useNavigation<
      BookingStackScreenProps<'BookingDetailScreen'>['navigation']
    >()

  const {
    responsibleStudent,
    cubicleSchedule,
    guestStudents,
    accessories,
    id,
  } = route?.params?.detail

  const actionSheetRef: any = useRef(null)
  const [isChecked, setIsChecked] = useState(false)
  const {
    isLoading,
    getMotivosCancel,
    onChangeMotivoCancelSelect,
    motivoCancelSelect,
    fetchCancelReservations,
  } = useBookingDetailInteractor()

  const onOpen = () => {
    actionSheetRef.current?.show()
  }

  const handleSubmitCancelReservation = async () => {
    if (!id || !motivoCancelSelect) return
    const reservaId = String(id)
    const ReasonCancellationId = motivoCancelSelect.id
    const getResponseCancel = await fetchCancelReservations({
      reservaId,
      ReasonCancellationId,
    })

    if (!getResponseCancel.status) return
    Toast.show({
      type: 'success',
      text1: 'Reserva cancelada',
      text2: 'Hemos enviado un correo con la cancelación',
    })
    navigation.replace('BookingsListScreen')
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  return (
    <ScrollView bg="white">
      <Ribbon.base
        title="Detalle"
        RightComponent={() => (
          <TouchableOpacity onPress={() => navigation.push('BookingEditScreen', {detail: route?.params?.detail })}>
            <IconPencil />
          </TouchableOpacity>
        )}
        isLoading={isLoading}
      />
      <View height={20} />
      <View px="1">
        <Paragraph>
          Recuerda que debes estar 10 minutos antes de tu reserva
        </Paragraph>

        <View height={20} />

        {/* responsable sala */}
        <View flexDirection="row">
          <View>
            <Image
              source={{ uri: responsibleStudent.imageUrl }}
              resizeMode="cover"
              style={{
                width: 40,
                height: 40,
                borderRadius: 99,
              }}
            />
          </View>
          <View>
            <Paragraph fontWeight="600" fontSize={17}>
              Responsable de Sala
            </Paragraph>
            <Paragraph
              fontWeight="400"
              fontSize={
                12
              }>{`${responsibleStudent.name} ${responsibleStudent.lastName}`}</Paragraph>
          </View>
        </View>

        <View height={20} />

        {/* detalle */}
        <View flexDirection="column">
          <View flexDirection="row">
            <IconUbication />
            <View width={10} />
            <Paragraph fontWeight="600">Sede X</Paragraph>
          </View>
          <View flexDirection="row">
            <IconCalendar />
            <View width={10} />
            <Paragraph>
              {
                CDateTime.getInstance().getMetaDataByDay(
                  moment(cubicleSchedule.startAt),
                ).DDMMMMAAAA
              }
            </Paragraph>
          </View>
          <View flexDirection="row">
            <IconReloj />
            <View width={10} />
            <Paragraph>
              {`${
                CDateTime.getInstance().getMetaDataByDay(
                  moment(cubicleSchedule.startAt),
                ).hora
              } - ${
                CDateTime.getInstance().getMetaDataByDay(
                  moment(cubicleSchedule.endAt),
                ).hora
              }`}
            </Paragraph>
          </View>
        </View>

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontWeight="600" color="black">
          Cubículo
        </Paragraph>
        <Paragraph fontSize={14}>Capcidad para 6 personas</Paragraph>

        <View flexDirection="row">
          {guestStudents.map((inviteItem, index) => (
            <View key={inviteItem.id}>
              <Image
                source={{ uri: responsibleStudent.imageUrl }}
                resizeMode="cover"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 99,
                  marginLeft: index === 0 ? 0 : -8,
                }}
              />
            </View>
          ))}
        </View>

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontWeight="600" color="black">
          Accesorio Adicional
        </Paragraph>
        <Paragraph>{accessories[0].name}</Paragraph>

        <View height={300} />
        <Button title="Cancelar Reserva" type="primary" onPress={onOpen} />
      </View>

      <ActionSheet ref={actionSheetRef}>
        <View pt="2" px="1">
          <Paragraph color="primary" fontSize={20} fontWeight="600">
            Cancelar Reserva
          </Paragraph>
          <View height={20} />
          <View flexDirection="column">
            <View flexDirection="row">
              <IconUbication />
              <View width={14} />
              <Paragraph fontWeight="600">Sede X</Paragraph>
            </View>
            <View flexDirection="row">
              <IconCalendar />
              <View width={10} />
              <Paragraph>
                {
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(cubicleSchedule.startAt),
                  ).DDMMMMAAAA
                }
              </Paragraph>
            </View>
            <View flexDirection="row">
              <IconReloj />
              <View width={14} />
              <Paragraph>
                {`${
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(cubicleSchedule.startAt),
                  ).hora
                } - ${
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(cubicleSchedule.endAt),
                  ).hora
                }`}
              </Paragraph>
            </View>
          </View>

          <View py="1">
            <Paragraph fontWeight="600">Motivos de Cancelación</Paragraph>
          </View>

          {getMotivosCancel?.data.map((item) => {
            const isSelect = item.id === motivoCancelSelect?.id
            return (
              <View key={item.id} pb="0.5">
                <RadioButton
                  checked={isSelect}
                  text={item.reason}
                  onPress={() => {
                    setIsChecked((prev) => !prev)
                    onChangeMotivoCancelSelect(item)
                    setValue('motivo', item)
                  }}
                />
              </View>
            )
          })}

          <View height={20} />

          {/* <FormInput
            control={control}
            name="motivo"
            placeholder="Agregar otro motivo"
            errors={errors}
          /> */}

          <View height={10} />
          <View py="1">
            <Button
              title="Confirmar Cancelación"
              onPress={handleSubmitCancelReservation}
              type="primary"
            />
          </View>
        </View>
      </ActionSheet>
    </ScrollView>
  )
}

export default BookingDetailScreen
