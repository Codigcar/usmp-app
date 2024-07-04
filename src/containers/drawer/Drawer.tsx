import { TouchableOpacity } from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

import {
  IconMisNotas,
  IconPlay,
  IconScan,
  IconTriangleBottom,
} from '../../assets/icons'
import { SafeAreaView, ScrollView, View } from '../../components/box'
import { Paragraph } from '../../components/typhografic'
import {
  IconBiblioteca,
  IconBolsaTrabajo,
  IconCalendar,
  IconEventos,
  IconHome,
  IconMisCursos,
  IconNoticias,
  IconPagoPensiones,
} from '../../assets/icons'
import DrawerItem from './DrawerItem'
import { useAuth } from '../../context/auth.provider'
import DrawerHeader from './Drawer.header'
import { CommonActions, useNavigation } from '@react-navigation/native'

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { signOut, isAuthenticated, user } = useAuth()

  const MOCK = [
    {
      isNeedAuth: true,
      icon: <IconHome />,
      name: 'Home',
      navigation: () => {
        navigation.navigate('HomeScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconMisCursos />,
      name: 'Mis cursos',
      navigation: () => {
        navigation.navigate('CoursessStackScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconMisNotas />,
      name: 'Mis notas',
      navigation: () => {
        navigation.navigate('CalificationsStackScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconCalendar />,
      name: 'Mi Calendario',
      navigation: () => {
        navigation.navigate('CalendarScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconPagoPensiones />,
      name: 'Pago de pensiones',
      navigation: () => {
        navigation.navigate('PaymentsScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconBolsaTrabajo />,
      name: 'Bolsa de trabajo',
      navigation: () => {
        navigation.navigate('JobBoardStackScreen')
      },
    },
    {
      isNeedAuth: true,
      icon: <IconBiblioteca />,
      name: 'Biblioteca',
      navigation: () => {
        navigation.navigate('BookingsStackScreen')
      },
    },
    {
      isNeedAuth: false,
      icon: <IconNoticias />,
      name: 'Noticias',
      navigation: () => {
        navigation.navigate('NewsScreen')
      },
    },
    {
      isNeedAuth: false,
      icon: <IconEventos />,
      name: 'Eventos',
      navigation: () => {
        navigation.navigate('EventsStackScreen')
      },
    },
  ]

  return (
    <ScrollView flex={1}>
      <SafeAreaView edges={['top']} flex={1} bg="trueGray-900" />

      <DrawerHeader
        navigation={navigation}
        isAuthenticated={isAuthenticated ?? false}
        fullName={`${user?.name} ${user?.lastName}`}
        imageUrl={user?.imageUrl ?? ''}
        numMatricula={user?.code ?? ''}
      />

      <View height={20} />
      {MOCK.map((item, index) => {
        return (
          <View key={index}>
            {item.isNeedAuth && isAuthenticated ? (
              <DrawerItem
                key={index}
                icon={item.icon}
                name={item.name}
                onPress={() => {
                  item.navigation()
                  navigation.closeDrawer()
                }}
              />
            ) : null}
            {!item.isNeedAuth ? (
              <DrawerItem
                key={index}
                icon={item.icon}
                name={item.name}
                onPress={() => {
                  item.navigation()
                  navigation.closeDrawer()
                }}
              />
            ) : null}
          </View>
        )
      })}

      {isAuthenticated ? (
        <TouchableOpacity
          onPress={() => {
            signOut()
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: 'BottomTabNavigator',
                    state: { routes: [{ name: 'LoginScreen' }] },
                  },
                ],
              }),
            )
          }}>
          <View px="1.5">
            <Paragraph color="primary" fontWeight="700">
              CERRAR SESIÓN
            </Paragraph>
          </View>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  )
}

export default Drawer
