import { TouchableOpacity } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { useState } from 'react'
import moment from 'moment'

import {
  IconBell,
  IconCalendar,
  IconCalendarLeft,
  IconCalendarRight,
  IconThreeLines,
} from '../../../assets/icons'
import { ScrollView, View } from '../../../components/box'
import DropdownComponent from '../../../components/input/dropdown'
import Ribbon from '../../../components/ribbon'
import { TimeLineItem } from '../../../components/time'
import { Paragraph } from '../../../components/typhografic'
import { useStudyPlan } from '../../../context'
import { convertToDataDropdown } from '../../Courses/infrastructure/utils'
import CDateTime from '../../../libraries-implementation/dateTime'
import useCalendarInteractor from './Calendar.interactor'

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ener.', 'Febr.', 'Marz.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Agost.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vie.', 'Sab.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'es';

const CalendarScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const { studyPlanSelect, studyPLanList } = useStudyPlan()
  const [selected, setSelected] = useState('')
  const [isVisibleMes, setIsVisibleMes] = useState(false)

  const { getWeekDays, daySelect, onChangeDaySelect, getDatesList, isLoading } =
    useCalendarInteractor()

  const onChangeMes = () => {
    setIsVisibleMes(!isVisibleMes)
  }

  return (
    <ScrollView flex={1} bg="white">
      <Ribbon.base
        isLoading={isLoading}
        title="Calendario"
        RightComponent={() => (
          <View flexDirection="row">
            <TouchableOpacity
              onPress={() => navigation.push('MyCourseNotifications')}>
              <IconBell />
            </TouchableOpacity>
            <View width={10} />
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconThreeLines />
            </TouchableOpacity>
          </View>
        )}
      />
      <View px="1">
        <View height={30} />
        <DropdownComponent
          placeholder="Plan de estudio"
          data={convertToDataDropdown(studyPLanList) as any}
          defaultValue={convertToDataDropdown(studyPlanSelect!) as any}
        />
        <View height={20} />

        <View
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center">
          <View>
            <Paragraph color="primary" fontWeight="600">
              {daySelect.shortNameFull}
            </Paragraph>
          </View>
          <TouchableOpacity onPress={onChangeMes} hitSlop={10}>
            <View flexDirection="row" alignItems="center">
              <Paragraph fontSize={8} color="primary" fontWeight="600">
                {isVisibleMes ? 'VER SEMANA' : 'VER MES'}
              </Paragraph>
              <View width={5} />
              <IconCalendar />
            </View>
          </TouchableOpacity>
        </View>

        <View height={5} />
        {isVisibleMes ? (
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString)
              const dateNew = moment(day.dateString).locale('es')
              const daySelectNew =
                CDateTime.getInstance().getMetaDataByDay(dateNew)
              onChangeDaySelect(daySelectNew)
            }}
            markedDates={{
              [daySelect.date]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'black',
              },
            }}
            renderArrow={(direction) =>
              direction === 'left' ? (
                <IconCalendarLeft />
              ) : (
                <IconCalendarRight />
              )
            }
          />
        ) : (
          <ScrollView>
            <View flexDirection="row">
              {getWeekDays.map((item) => {
                const isSelect = daySelect?.date === item.date
                return (
                  <TouchableOpacity
                    onPress={() => onChangeDaySelect(item)}
                    key={item.date}>
                    <>
                      <View px="1">
                        <Paragraph fontWeight="600">
                          {item.firstLetter}
                        </Paragraph>
                      </View>
                      <View
                        mr="0.5"
                        height={40}
                        width={40}
                        bg={isSelect ? 'black' : 'white'}
                        borderRadius="full"
                        justifyContent="center"
                        alignItems="center"
                        borderWidth={1}
                        borderColor="black">
                        <Paragraph color={isSelect ? 'white' : 'black'}>
                          {item.num}
                        </Paragraph>
                      </View>
                    </>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        )}
      </View>

      <View height={15} />
      {getDatesList?.data.map((item, index) => (
        <TimeLineItem
          key={index}
          status={item.status}
          disableLineTop={index === 0}
          disableLineBottom={index === getDatesList?.data.length - 1}
          isOneItem={getDatesList?.data.length === 1}
          item={item}
        />
      ))}
      {getDatesList?.data.length === 0 ? (
        <>
          <View height={50} />
          <Paragraph textAlign="center">No hay cursos disponibles</Paragraph>
        </>
      ) : null}
    </ScrollView>
  )
}

export default CalendarScreen
