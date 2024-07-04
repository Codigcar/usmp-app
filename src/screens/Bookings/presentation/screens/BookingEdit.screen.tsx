import { useNavigation, useRoute } from '@react-navigation/native'
import { FlatList, TouchableOpacity } from 'react-native'
import moment from 'moment'

import { ScrollView, View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { BookingCreateSection } from '../components'
import Button from '../../../../components/button'
import useBookingCreateInteractor from './BookingCreate.interactor'
import Ribbon from '../../../../components/ribbon'
import { convertToDataDropdown } from '../../../Courses/infrastructure/utils'
import DropdownComponent from '../../../../components/input/dropdown'
import CDateTime from '../../../../libraries-implementation/dateTime/index'
import { BookingStackScreenProps } from '../../../../routes/types'
import useBookingCreate2Interactor from './BookingCreate2.interactor'
import MultiSelectComponent from '../../../../components/input/multiSelect'
import { IconValidSuccess } from '../../../../assets/icons'
import useBookingEditInteractor from './BookingEdit.interactor'
import { ModalToast } from '../../../../components/toast'

const BookingEditScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const route =
    useRoute<BookingStackScreenProps<'BookingEditScreen'>['route']>()
  const detailEntity = route.params.detail

  const {
    isLoading,
    getSedesList,
    valueDropdown,
    onChangeValueDropdown,
    getCubiclesList,
    getDatesFreeList,
    getHoursFreeList,
    onChangeCubicleSelect,
    onChangeHoursFreeSelect,
    onChangeDateFreeSelect,
    onChangeDateHoursFreeSelect,
    cubicleSelect,
    dateFreeSelect,
    dateHoursSelect,
    hoursFreeSelect,
  } = useBookingCreateInteractor(detailEntity)

  const {
    getMembersList,
    onChangeMembers,
    membersSelect,
    isLoading: isLoading2,
    getAccesoriosList,
    accesorioSelect,
    onChangeAccesorio,
  } = useBookingCreate2Interactor(detailEntity)

  const {
    fetchUpdateReservation,
    isLoading: isLoading3,
    showModalConfirmation,
    onToggleModal,
  } = useBookingEditInteractor()

  return (
    <ScrollView flex={1} bg="white">
      <Ribbon.base
        title="Editar Reserva"
        isLoading={isLoading || isLoading2 || isLoading3}
      />
      <View px="1">
        <View height={10} />
        <Paragraph color="primary" fontWeight="600">
          Datos de la reserva
        </Paragraph>
        <Paragraph>
          Las salas disponibles de las bibliotecas solo se reservan con 48 hrs
          de anticipación
        </Paragraph>
        <View height={10} />
        {getSedesList ? (
          <DropdownComponent
            placeholder="Sede"
            data={
              convertToDataDropdown(getSedesList?.data, {
                labelKey: 'name',
                valueKey: 'id',
              }) as any
            }
            defaultValue={valueDropdown}
            onChange={onChangeValueDropdown}
          />
        ) : null}
      </View>

      <View height={20} />

      {/* cubiculos */}

      <BookingCreateSection
        title="Cubículos"
        subTitle="Estos son los cubiculos disponibles actualmente">
        <FlatList
          data={getCubiclesList?.data ?? []}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => {
            const isSelect = cubicleSelect?.id === item.id
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onChangeCubicleSelect(item)
                  }}>
                  <View
                    bg={isSelect ? 'black' : 'white'}
                    height={40}
                    width={40}
                    borderRadius="full"
                    borderWidth={1}
                    justifyContent="center"
                    alignItems="center">
                    <Paragraph color={isSelect ? 'white' : 'black'}>
                      {item.id}
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
          ItemSeparatorComponent={() => <View width={10} />}
        />
      </BookingCreateSection>

      <View height={20} />

      {/* fechas disponibles */}

      <BookingCreateSection
        title="Fechas Disponibles"
        subTitle="fechas disponibles para Septiembre">
        <FlatList
          data={getDatesFreeList?.data ?? []}
          keyExtractor={(_, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => {
            const isSelect = dateFreeSelect?.numberDay === item.numberDay
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onChangeDateFreeSelect(item)
                  }}>
                  <View
                    bg={isSelect ? 'black' : 'white'}
                    height={40}
                    width={40}
                    borderRadius="full"
                    borderWidth={1}
                    justifyContent="center"
                    alignItems="center">
                    <Paragraph color={isSelect ? 'white' : 'black'}>
                      {item.numberDay}
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
          ItemSeparatorComponent={() => <View width={10} />}
        />
      </BookingCreateSection>

      <View height={20} />

      {/* horarios disponibles */}

      <BookingCreateSection
        title="Horarios"
        subTitle="Selecciona cuantas horas deseas ir">
        <FlatList
          data={dateFreeSelect?.numberHours ?? []}
          keyExtractor={(_, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => {
            // const isSelect = dateFreeSelect?.numberDay === item.numberDay
            const isSelect = item === dateHoursSelect
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onChangeDateHoursFreeSelect(item)
                  }}>
                  <View
                    bg={isSelect ? 'black' : 'white'}
                    height={40}
                    width={40}
                    borderRadius="full"
                    borderWidth={1}
                    justifyContent="center"
                    alignItems="center">
                    <Paragraph color={isSelect ? 'white' : 'black'}>
                      {item}
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
          ItemSeparatorComponent={() => <View width={10} />}
        />
      </BookingCreateSection>

      <View height={20} />

      {/* Disponibles */}

      <BookingCreateSection
        title="Disponibilidad"
        subTitle="Selecciona uno de nustros horarios disponibles">
        <FlatList
          data={getHoursFreeList?.data ?? []}
          keyExtractor={(_, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => {
            const isSelect = hoursFreeSelect?.id === item.id
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onChangeHoursFreeSelect(item)
                  }}>
                  <View
                    bg={isSelect ? 'black' : 'white'}
                    height={40}
                    px="1"
                    borderRadius="full"
                    borderWidth={1}
                    justifyContent="center"
                    alignItems="center">
                    <Paragraph color={isSelect ? 'white' : 'black'}>
                      {
                        CDateTime.getInstance().getMetaDataByDay(
                          moment(item.startAt).locale('es'),
                        ).hora
                      }{' '}
                      -{' '}
                      {
                        CDateTime.getInstance().getMetaDataByDay(
                          moment(item.endAt).locale('es'),
                        ).hora
                      }
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
          ItemSeparatorComponent={() => <View width={10} />}
        />
      </BookingCreateSection>

      <View py="2" px="1">
        <Paragraph fontWeight="600" color="black" fontSize={16}>
          Integrantes que asistirán
        </Paragraph>
        <Paragraph>El cubículo tiene capacidad para 6 personas</Paragraph>

        <View height={20} />

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

        <View height={10} />

        {(membersSelect?.length ?? 0) >= 6 ? (
          <View flexDirection="row">
            <IconValidSuccess width={16} height={16} />
            <View width={7} />
            <Paragraph>Capacidad máxima del cubículo completa</Paragraph>
          </View>
        ) : null}

        <View height={30} />

        <Paragraph fontWeight="600" color="black" fontSize={16}>
          Accesorio adicional
        </Paragraph>
        <Paragraph>
          Selecciona los accesorios que necesites de la biblioteca
        </Paragraph>

        <View height={20} />

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

        <Button
          type="primary"
          disabled={
            !valueDropdown ||
            !cubicleSelect ||
            !dateFreeSelect ||
            !hoursFreeSelect ||
            !dateHoursSelect
          }
          title="Modificar"
          onPress={async () => {
            if (!cubicleSelect) return
            if (!membersSelect) return
            if (!hoursFreeSelect) return

            const payload = {
              cubicleId: cubicleSelect.id,
              scheduleId: hoursFreeSelect.id,
              guestStudents: membersSelect.map(Number),
              accessories: [Number(accesorioSelect)],
            }
            const getResponse = await fetchUpdateReservation({
              reservationId: String(detailEntity.id),
              payload,
            })

            if (!getResponse.status) return
            onToggleModal()
          }}
        />
      </View>
      {showModalConfirmation ? (
        <ModalToast
          onRequestClose={() => {
            navigation.replace('BookingsListScreen')
          }}
          title="Reserva en espera de confirmación"
          description="Su reserva deberá ser validada, le notificaremos por la app o a su correo"
        />
      ) : null}
    </ScrollView>
  )
}

export default BookingEditScreen
