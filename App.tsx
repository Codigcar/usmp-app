import React, { useEffect, useLayoutEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { LinkingOptions, NavigationContainer, useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-gesture-handler' // dependencia para instalar react-nativation/drawer

import {
  AuthStack,
  BookingsStack,
  CalificationsStack,
  CoursesStack,
  EventsStack,
  HomeStack,
  JobBoardStack,
  ProfileStack,
  RootStack,
} from './src/routes'
import {
  LoginScreen,
  RolScreen,
  RecoveryPasswordScreen,
  CodeOTPScreen,
  ConfirmNewPassword,
  ChangePasswordScreen,
} from './src/screens/Auth/presentation/screens'
import toastConfig from './src/components/toast/Toast'
import HomeScreen from './src/screens/Home/presentation/screens/Home.screen'
import MyCoursesScreen from './src/screens/Courses/presentation/screens/MyCourses.screen'
import {
  MyCourseNotificationsScreen,
  MyCoursesDetailScreen,
  MyPuntualityScreen,
  MyStudentsScreen,
} from './src/screens/Courses/presentation/screens'
import MyCourseMaterialScreen from './src/screens/Courses/presentation/screens/MyCourseMaterial.screen'
import { DrawerContent, MenuHeaderV2 } from './src/containers'
import CarnetScreen from './src/screens/Home/presentation/screens/Carnet.screen'
import MyCalificationMainScreen from './src/screens/Califications/presentation/MyCalificationsMain.screen'
import { MyCalificationDetailSreen } from './src/screens/Califications/presentation'
import EventsScreen from './src/screens/Events/presentation/screens/Events.screen'
import {
  MyProfileEditScreen,
  MyProfileScreen,
} from './src/screens/Profile/presentation/screens'
import {
  ConfirmInformationScreen,
  EventDetailScreen,
} from './src/screens/Events/presentation/screens'
import {
  BookingCreate2Screen,
  BookingCreateScreen,
  BookingsListScreen,
} from './src/screens/Bookings/presentation/screens'
import { Provider } from 'react-redux'
import store from './src/libraries-implementation/redux/store'
import { JobBoardScreen } from './src/screens/JobBoard/presentation/screen'
import CalendarScreen from './src/screens/Calendar/presentation/Calendar.screen'
import PaymentsScreen from './src/screens/Payments/presentation/Payments.screen'
import PaymentDetailScreen from './src/screens/Payments/presentation/PaymentDetail.screen'
import NewsPublicScreen from './src/screens/News/presentation/News.public.screen'
import NewDetailScreen from './src/screens/News/presentation/NewDetail.screen'
import ChangePasswordScreen2 from './src/screens/Profile/presentation/screens/ChangePassword2.screen'
import EventPaymentScreen from './src/screens/Events/presentation/screens/EventPayment.screen'
import VerificationScreen from './src/screens/Auth/presentation/screens/changePassword/Verification.screen'
import { AuthProvider, useAuth } from './src/context/auth.provider'
import { ThemeProvider } from './src/context/theme.provider'
import { initForegroundMessageHandler } from './src/utils/firebase'
import SplashScreen from 'react-native-splash-screen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StudyPlanProvider, useStudyPlan } from './src/context'
import Ribbon from './src/components/ribbon'
import useHomeInteractor from './src/screens/Home/presentation/screens/Home.interactor'
import { SafeAreaView } from './src/components/box'
import { ActivityIndicator, Linking } from 'react-native'
import PaymentResumenScreen from './src/screens/Payments/presentation/PaymentResumen.screen'
import NewsScreen from './src/screens/News/presentation/News.screen'
import BookingDetailScreen from './src/screens/Bookings/presentation/screens/BookingDetail.screen'
import BookingEditScreen from './src/screens/Bookings/presentation/screens/BookingEdit.screen'

const JobBoardStackScreen: React.FC = () => {
  return (
    <JobBoardStack.Navigator
      initialRouteName="JobBoardScreen"
      screenOptions={{ headerShown: false }}>
      <JobBoardStack.Screen name="JobBoardScreen" component={JobBoardScreen} />
    </JobBoardStack.Navigator>
  )
}

const BookingsStackScreen: React.FC = () => {
  return (
    <BookingsStack.Navigator
      initialRouteName="BookingsListScreen"
      screenOptions={{ headerShown: false }}>
      <BookingsStack.Screen
        name="BookingsListScreen"
        component={BookingsListScreen}
      />
      <BookingsStack.Screen
        name="BookingCreateScreen"
        component={BookingCreateScreen}
      />
      <BookingsStack.Screen
        name="BookingCreate2Screen"
        component={BookingCreate2Screen}
      />
      <BookingsStack.Screen
        name="BookingDetailScreen"
        component={BookingDetailScreen}
      />
      <BookingsStack.Screen
        name="BookingEditScreen"
        component={BookingEditScreen}
      />
    </BookingsStack.Navigator>
  )
}

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="MyProfileScreen"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <ProfileStack.Screen
        name="ChangePasswordScreen2"
        component={ChangePasswordScreen2}
      />
      <ProfileStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <ProfileStack.Screen
        name="MyProfileEditScreen"
        component={MyProfileEditScreen}
      />
    </ProfileStack.Navigator>
  )
}

const EventsStackScreen: React.FC = () => {
  return (
    <EventsStack.Navigator
      initialRouteName="EventsScreen"
      screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="EventsScreen" component={EventsScreen} />
      <EventsStack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
      />
      <EventsStack.Screen
        name="ConfirmInformationScreen"
        component={ConfirmInformationScreen}
      />
      <EventsStack.Screen
        name="EventPaymentScreen"
        component={EventPaymentScreen}
      />
    </EventsStack.Navigator>
  )
}

const CalificationsStackScreen: React.FC = () => {
  return (
    <CalificationsStack.Navigator
      initialRouteName="MyCalificationMainScreen"
      screenOptions={{ headerShown: false }}>
      <CalificationsStack.Screen
        name="MyCalificationMainScreen"
        component={MyCalificationMainScreen}
      />
      <CalificationsStack.Screen
        name="CalificationDetailScreen"
        component={MyCalificationDetailSreen}
      />
    </CalificationsStack.Navigator>
  )
}

const CoursesStackScreen: React.FC = () => {
  const { courseSelect, studyPlanSelect } = useStudyPlan()
  const { isLoading, coursesList } = useHomeInteractor()

  return (
    <CoursesStack.Navigator initialRouteName="MyCoursesScreen">
      <CoursesStack.Screen
        options={{ headerShown: false }}
        name="MyCoursesScreen"
        component={MyCoursesScreen}
      />
      <CoursesStack.Group
        screenOptions={{
          header: () => {
            return (
              <Ribbon.myCourses
                title={courseSelect?.name ?? 'no hay info'}
                subTitle={`Año ${studyPlanSelect?.year} - Semestre ${studyPlanSelect?.period}`}
                coursesList={coursesList}
              />
            )
          },
        }}>
        <CoursesStack.Screen
          name="CourseDetailScreen"
          component={MyCoursesDetailScreen}
        />
        <CoursesStack.Screen
          name="MyCourseMaterialScreen"
          component={MyCourseMaterialScreen}
        />
        <CoursesStack.Screen
          name="MyPuntualityScreen"
          component={MyPuntualityScreen}
        />
        <CoursesStack.Screen
          name="MyStudentsScreen"
          component={MyStudentsScreen}
        />
        <CoursesStack.Screen
          name="MyCourseNotifications"
          component={MyCourseNotificationsScreen}
        />
      </CoursesStack.Group>
    </CoursesStack.Navigator>
  )
}

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return <MenuHeaderV2 />
          },
        }}
      />

      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="CarnetScreen" component={CarnetScreen} />

        <HomeStack.Screen
          name="CoursessStackScreen"
          component={CoursesStackScreen}
        />

        <HomeStack.Screen
          name="CalificationsStackScreen"
          component={CalificationsStackScreen}
        />
        <HomeStack.Screen
          name="EventsStackScreen"
          component={EventsStackScreen}
        />
        <HomeStack.Screen
          name="ProfileStackScreen"
          component={ProfileStackScreen}
        />
        <HomeStack.Screen
          name="BookingsStackScreen"
          component={BookingsStackScreen}
        />
        <HomeStack.Screen
          name="JobBoardStackScreen"
          component={JobBoardStackScreen}
        />
        <HomeStack.Screen name="CalendarScreen" component={CalendarScreen} />
        <HomeStack.Screen name="PaymentsScreen" component={PaymentsScreen} />
        <HomeStack.Screen
          name="PaymentDetailScreen"
          component={PaymentDetailScreen}
        />
        <HomeStack.Screen
          name="PaymentResumenScreen"
          component={PaymentResumenScreen}
        />
        <HomeStack.Screen name="NewDetailScreen" component={NewDetailScreen} />
        <HomeStack.Screen name="NewsScreen" component={NewsScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const AuthStackScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top']} flex={1} bg="white">
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen
          name="RecoveryPasswordScreen"
          component={RecoveryPasswordScreen}
        />
        <AuthStack.Screen name="CodeOTPScreen" component={CodeOTPScreen} />
        <AuthStack.Screen
          name="ConfirmNewPassword"
          component={ConfirmNewPassword}
        />

        <AuthStack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  )
}

const DrawerRoot = createDrawerNavigator()
const AuthScreen = createNativeStackNavigator()
const AppStack = createNativeStackNavigator()

const AppStackNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const navigation: any = useNavigation()

  const redirect = () => {
    if (!isAuthenticated) {
    }
  }

  useEffect(() => {
    redirect()
  }, [isAuthenticated])

  return (
    <AppStack.Navigator
      // initialRouteName={isAuthenticated ? 'HomeStackScreen' : 'RolScreen'}
      initialRouteName={'RolScreen'}
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="RolScreen" component={RolScreen} />
      <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      <RootStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
    </AppStack.Navigator>
  )
}

const RootStackScreen: React.FC = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2500)
  }, [])

  return (
    <DrawerRoot.Navigator
      initialRouteName="App"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: { borderTopStartRadius: 12 },
      }}>
      <DrawerRoot.Screen
        name="App"
        component={AppStackNavigator}
        options={{ headerShown: false }}
      />
    </DrawerRoot.Navigator>
  )
}

// const linking = {
//   prefixes: ['peoplesapp://'],
// }

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['myapp://'],
  config: {
    // initialRouteName: 'Home',
    screens: {
      App: {
        screens: {
          HomeStackScreen: {
            screens: {
              HomeScreen: '',
              CarnetScreen: 'carnet',
              CoursessStackScreen: 'courses',
              CalificationsStackScreen: 'califications',
              EventsStackScreen: 'events',
              ProfileStackScreen: 'profile',
              BookingsStackScreen: 'bookings',
              JobBoardStackScreen: 'jobboard',
              CalendarScreen: 'calendar',
              PaymentsScreen: 'payments',
              PaymentDetailScreen: 'payments/detail',
              PaymentResumenScreen: 'payments/resumen',
              NewsScreen: 'news',
              NewDetailScreen: 'news/detail',
            },
          },
          AuthStackScreen: {
            screens: {
              LoginScreen: 'login',
              RecoveryPasswordScreen: 'recover-password',
              CodeOTPScreen: 'otp',
              ConfirmNewPassword: 'confirm-password',
              ChangePasswordScreen: 'change-password',
            },
          },
        },
      },
    },
  },
}

/*  */
const App = () => {
  useEffect(() => {
    const unsubscribe = initForegroundMessageHandler()
    return unsubscribe
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <StudyPlanProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
              <NavigationContainer
                linking={linking}
                fallback={<ActivityIndicator color="blue" size="large" />}>
                <RootStackScreen />
              </NavigationContainer>
            </Provider>
          </GestureHandlerRootView>
        </StudyPlanProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </ThemeProvider>
  )
}

export default App
