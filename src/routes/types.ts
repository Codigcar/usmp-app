import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PaymentsEntityData } from '../screens/Payments/domain/entity/payments.entity'
import ProfileEntity from '../screens/Profile/domain/entities/profile.entity'
import { NewInfoEntity } from '../screens/News/domain/entities/news.entity'
import { ReservationListEntityData } from '../screens/Bookings/domain/entities/reservationList.entity';

export type DrawerStackParamList = {
  HomeStackScreen: NavigatorScreenParams<HomeStackParamList>
}

export type RootStackParamList = {
  RolScreen: undefined
  AuthStackScreen: NavigatorScreenParams<AuthStackParamList>
  HomeStackScreen: NavigatorScreenParams<HomeStackParamList>
  DrawerNativagation: undefined
  NewsScreen: undefined
}

export type AuthStackParamList = {
  LoginScreen: undefined
  RecoveryPasswordScreen: undefined
  CodeOTPScreen: { email: string }
  ConfirmNewPassword: { email: string; codeOTP: string }
  ChangePasswordScreen: undefined
}

export type HomeStackParamList = {
  HomeScreen: undefined
  CarnetScreen: undefined
  CoursessStackScreen: NavigatorScreenParams<CoursesStackParamList>
  CalificationsStackScreen: NavigatorScreenParams<CalificationsStackParamList>
  EventsStackScreen: NavigatorScreenParams<EventsStackParamList>
  ProfileStackScreen: NavigatorScreenParams<ProfileStackParamList>
  BookingsStackScreen: NavigatorScreenParams<BookingStackParamList>
  JobBoardStackScreen: NavigatorScreenParams<JobBoardStackParamList>
  CalendarScreen: undefined
  PaymentsScreen: undefined
  PaymentDetailScreen: { listToPay: PaymentsEntityData[] }
  PaymentResumenScreen: { listToPay: PaymentsEntityData[] }
  LibraryScreen: undefined
  NewsScreen: undefined
  NewDetailScreen: { newInfo: NewInfoEntity }
}

export type CalificationsStackParamList = {
  MyCalificationMainScreen: undefined
  CalificationDetailScreen: undefined
}

export type CoursesStackParamList = {
  MyCoursesScreen: undefined
  CourseDetailScreen: undefined
  MyCalifications: undefined
  MyCourseMaterialScreen: undefined
  MyPuntualityScreen: undefined
  MyStudentsScreen: undefined
  MyCourseNotifications: undefined
}

export type EventsStackParamList = {
  EventsScreen: undefined
  EventDetailScreen: undefined
  ConfirmInformationScreen: undefined
  EventPaymentScreen: undefined
}

export type ProfileStackParamList = {
  MyProfileScreen: undefined
  MyProfileEditScreen: { profileEntity: ProfileEntity }
  ChangePasswordScreen2: { username: string; currentPassword: string }
  VerificationScreen: undefined
}

export type BookingStackParamList = {
  BookingsListScreen: undefined
  BookingCreateScreen: undefined
  BookingCreate2Screen: {
    cubiculoId: number
    fechaId: number
  }
  BookingDetailScreen: {
    detail: ReservationListEntityData
  }
  BookingEditScreen: {
    detail: ReservationListEntityData
  }
}

export type JobBoardStackParamList = {
  JobBoardScreen: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>

export type CalificationsStackScreenProps<
  T extends keyof CalificationsStackParamList,
> = NativeStackScreenProps<CalificationsStackParamList, T>

export type CoursessStackScreenProps<T extends keyof CoursesStackParamList> =
  NativeStackScreenProps<CoursesStackParamList, T>

export type EventStackScreenProps<T extends keyof EventsStackParamList> =
  NativeStackScreenProps<EventsStackParamList, T>

export type DrawerStackScreenProps<T extends keyof DrawerStackParamList> =
  NativeStackScreenProps<DrawerStackParamList, T>

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>

export type BookingStackScreenProps<T extends keyof BookingStackParamList> =
  NativeStackScreenProps<BookingStackParamList, T>

export type JobBoardStackScreenProps<T extends keyof JobBoardStackParamList> =
  NativeStackScreenProps<JobBoardStackParamList, T>
