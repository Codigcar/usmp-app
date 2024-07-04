import { useNavigation, useRoute } from '@react-navigation/native'

import { ScrollView, View } from '../../../../components/box'
import Button from '../../../../components/button'
import DropdownComponent from '../../../../components/input/dropdown'
import MultiSelectComponent from '../../../../components/input/multiSelect'
import Ribbon from '../../../../components/ribbon'
import Separator from '../../../../components/separator'
import { Paragraph } from '../../../../components/typhografic'
import { useAuth } from '../../../../context'
import { convertToDataDropdown } from '../../../Courses/infrastructure/utils'
import useBookingCreate2Interactor from './BookingCreate2.interactor'
import { BookingStackScreenProps } from '../../../../routes/types'
import { ModalToast } from '../../../../components/toast'

type InputProps = {
  label: string
  text?: string
}

const Input: React.FC<InputProps> = ({ label, text = '' }) => {
  return (
    <View py="0.75">
      <Paragraph fontSize={10} fontWeight="600">
        {label}
      </Paragraph>
      <Paragraph color="black">{text}</Paragraph>
    </View>
  )
}

const BookingCreate2Screen: React.FC = () => {
  const navigation =
    useNavigation<
      BookingStackScreenProps<'BookingCreate2Screen'>['navigation']
    >()
  const route =
    useRoute<BookingStackScreenProps<'BookingCreate2Screen'>['route']>()
  const { cubiculoId, fechaId } = route.params

  const { user } = useAuth()
  const {
    isLoading,
    getMembersList,
    getAccesoriosList,
    onChangeAccesorio,
    onChangeMembers,
    toggleShowModalConfirmation,
    handleCreateReservation,
    accesorioSelect,
    membersSelect,
    showModalConfirmation,
  } = useBookingCreate2Interactor()

  return (
    <ScrollView bg="white">
      <Ribbon.base title="Nueva Reserva" isLoading={isLoading} />
      <View height={20} />
      <View px="1">
        <Paragraph fontWeight="600" color="primary">
          Responsable de la Sala
        </Paragraph>
        <Paragraph>
          Las salas disponibles de las bibliotecas solo se resevan con 48 hrs de
          anticipación
        </Paragraph>

        <Input label="Sede" text="Biblioteca Central de la USMP" />
        <Separator />

        <Input label="Apellidos" text={user?.lastName} />
        <Separator />

        <Input label="Nro de Matricula" text={user?.code} />
        <Separator />

        <Input label="Correo Institucional" text={user?.email} />

        <View height={30} />

        <Paragraph fontWeight="600" color="primary" fontSize={16}>
          Integrantes que asistirán
        </Paragraph>
        <Paragraph>El cubículo tiene capacidad para 6 personas</Paragraph>

        <View height={20} />

        {/* <DropdownComponent /> */}
        {getMembersList ? (
          <MultiSelectComponent
            data={
              convertToDataDropdown(getMembersList?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            placeholder="Nombres y Apellidos"
            onChange={onChangeMembers}
            value={membersSelect ?? []}
          />
        ) : null}

        <View height={20} />

        <Paragraph fontWeight="600" color="black" fontSize={16}>
          Accesorio adicional
        </Paragraph>
        <Paragraph>
          Selecciona los accesorios que necesites de la biblioteca
        </Paragraph>
        <View height={10} />
        {getAccesoriosList ? (
          <DropdownComponent
            placeholder="Selecciona"
            data={
              convertToDataDropdown(getAccesoriosList?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            defaultValue={accesorioSelect as any}
            onChange={onChangeAccesorio}
          />
        ) : null}
        <View height={20} />
        <View py="1">
          <Button
            title="Solicitar"
            onPress={() => {
              if (!membersSelect) return
              const payload = {
                cubicleId: cubiculoId,
                scheduleId: fechaId,
                guestStudents: membersSelect.map(Number),
                accessories: [Number(accesorioSelect)],
              }
              const onSuccess = () => {
                toggleShowModalConfirmation()
              }
              handleCreateReservation(payload, onSuccess)
            }}
            disabled={!accesorioSelect || !membersSelect}
            type="primary"
          />
        </View>
      </View>
      {showModalConfirmation ? (
        <ModalToast
          onRequestClose={() => {
            navigation.replace('BookingsListScreen')
          }}
        />
      ) : null}
    </ScrollView>
  )
}

export default BookingCreate2Screen
