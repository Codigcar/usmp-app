import { useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ScrollView from '../../../../components/box/ScrollView'
import View from '../../../../components/box/View'
import { TimeLineItem } from '../../../../components/time'
import {
  CourseSection,
  NextEventsSection,
  PendingPaySection,
  SectionTitle,
} from '../components'
import type { HomeStackScreenProps } from '../../../../routes/types'
import { Paragraph } from '../../../../components/typhografic'
import Loading from '../../../../components/loading'
import Image from '../../../../components/image'
import Button from '../../../../components/button'
import useHomeInteractor from './Home.interactor'
import { useStudyPlan } from '../../../../context'
import {
  IconCalendar,
  IconClose,
  IconLocalization,
} from '../../../../assets/icons'
import moment from 'moment'
import { Carousel } from '../../../../components/carousel'
import CDateTime from '../../../../libraries-implementation/dateTime'

const CURSOS_LIST = [
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
]

const EVENTOS_LIST = [
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
]

type IModal = {
  onPress: () => void
  children: JSX.Element
}

const ModalPopup: React.FC<IModal> = ({ onPress, children }) => {
  return (
    <Modal transparent visible>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
        {children}
      </View>
    </Modal>
  )
}

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(true)
  const { isLoading, coursesList, calendarList, popupsList, getHome } =
    useHomeInteractor()

  const navigation =
    useNavigation<HomeStackScreenProps<'HomeScreen'>['navigation']>()

  /*  */
  const { onChangeCourseSelect, onChangeEvent } = useStudyPlan()
  /*  */

  return (
    <ScrollView flex={1} bg="white">
      <View flex={1}>
        <View height={25} />

        <SectionTitle
          title={`Mis cursos (${coursesList.length})`}
          viewAllOnPress={() =>
            navigation.push('CoursessStackScreen', {
              screen: 'MyCoursesScreen',
            })
          }
          px="1"
        />

        <View height={15} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}>
          <View flexDirection="row">
            {coursesList.map((item, index) => (
              <CourseSection
                key={item.id}
                course={item}
                disableMarginRight={CURSOS_LIST.length - 1 === index}
                onPress={() => {
                  onChangeCourseSelect(item)
                  onChangeEvent(item.events[0])
                  if (coursesList.length === 1) {
                    navigation.push('CoursessStackScreen', {
                      screen: 'CourseDetailScreen',
                    })
                    return
                  }
                  navigation.push('CoursessStackScreen', {
                    screen: 'MyCoursesScreen',
                  })
                }}
              />
            ))}
          </View>
        </ScrollView>

        <View height={30} />

        <SectionTitle
          title={`Hoy, ${moment().locale('es').format('ddd D [de] MMMM')}`}
          viewAllOnPress={() => navigation.push('CalendarScreen')}
          px="1"
        />

        <View height={15} />
        {getHome?.data.schedules?.map((item, index) => (
          <TimeLineItem
            key={item.id}
            status={item.status}
            disableLineTop={index === 0}
            disableLineBottom={index === getHome.data.schedules.length - 1}
            item={item}
            isOneItem={calendarList?.data.length === 1}
          />
        ))}

        <View height={20} />

        <SectionTitle
          title="Pagos pendientes"
          viewAllOnPress={() => navigation.push('PaymentsScreen')}
          px="1"
        />

        <View height={10} />

        <View px="1">
          <PendingPaySection
            paymentCount={getHome?.data.payments.paymentsCount ?? 0}
            paymentDate={
              CDateTime.getInstance().getMetaDataByDay(
                moment(getHome?.data.payments.paymentsDate, 'MM/DD/YYYY HH:mm:ss'),
              ).DDMMMAAAA
            }
            paymentAmount={getHome?.data.payments.paymentsAmount ?? 0}
          />
        </View>

        <View height={15} />

        <SectionTitle
          title="Próximo eventos"
          viewAllOnPress={() => {
            navigation.push('EventsStackScreen', { screen: 'EventsScreen' })
            // navigation.push('EventsScreen')
          }}
          px="1"
        />

        <View height={10} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}>
          <View flexDirection="row">
            {getHome?.data.events.map((item, index) => (
              <View key={index}>
                <NextEventsSection
                  imageUrl={item.backgroundImage}
                  title={item.title}
                  ubication={item.address}
                  date={
                    CDateTime.getInstance().getMetaDataByDay(moment(item.date))
                      .DDMMMAAAA
                  }
                />
                <View width={10} />
              </View>
            ))}
          </View>
        </ScrollView>

        <View height={20} />
      </View>
      {false ? (
        <ModalPopup onPress={() => setShowPopup(false)}>
          <Carousel
            width={350}
            height={600}
            data={popupsList?.data ?? []}
            renderItem={({ index }) => (
              <View flex={1} padding="0" bg="white" borderRadius="xxl">
                <View flexDirection="column" flex={1} borderRadius="full">
                  <Image
                    source={require('../../../../assets/images/bg-rol-student.png')}
                    resizeMode="cover"
                    style={{
                      height: 80,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                  <View flex={1} px="1">
                    <View height={10} />
                    <Paragraph fontWeight="600" color="black">
                      {popupsList?.data[index].title}
                    </Paragraph>
                    <Paragraph fontSize={13} color="black">
                      {popupsList?.data[index].subtitle}
                    </Paragraph>
                    <View height={10} />
                    <Paragraph>{popupsList?.data[index].summary}</Paragraph>
                  </View>
                </View>
                <View width="90%" pl="1" pb="2">
                  <Button
                    title="Ver más"
                    onPress={() => {
                      setShowPopup(false)
                      navigation.push('NewsScreen')
                    }}
                    type="primary"
                  />
                </View>
              </View>
            )}
          />
        </ModalPopup>
      ) : null}
      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default HomeScreen
