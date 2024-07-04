import { Linking, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { IconLogoUSMP } from '../../../../assets/icons'
import View from '../../../../components/box/View'
import Image from '../../../../components/image'
import Paragraph from '../../../../components/typhografic/Paragraph'
import { requestUserPermission } from '../../../../utils/firebase'
import { useCallback, useEffect } from 'react'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { SafeAreaView } from '../../../../components/box'
import useIziPay from '../../../../hooks/useIziPay'

const RolScreen = () => {
  // const navigation =
  //   useNavigation<RootStackScreenProps<'RolScreen'>['navigation']>()
  const navigation: any = useNavigation()

  const { fetchIziPaySDK } = useIziPay()

  const initConfig = useCallback(() => {
    messaging().onNotificationOpenedApp(logMe)
    messaging().getInitialNotification().then(logMe)
  }, [])

  useEffect(() => {
    requestUserPermission()
    initConfig()
  }, [])

  const logMe = (data: any) => {
    console.log(JSON.stringify(data))
  }

  return (
    <>
      <SafeAreaView edges={['top']} bg="white" />
      <View bg="white" flex={1}>
        <View height={30} />

        <View pl="1">
          <IconLogoUSMP />
        </View>
        <View height={20} />

        <TouchableWithoutFeedback
          onPress={() => navigation.push('AuthStackScreen')}>
          <View
            width="100%"
            flexDirection="row"
            justifyContent="center"
            flex={1}>
            <View width="90%" position="relative">
              <Image
                source={require('../../../../assets/images/bg-rol-student.png')}
                resizeMode="cover"
                style={{ borderRadius: 20 }}
              />
              <View position="absolute" bottom={20} left={30}>
                <Paragraph color="white" fontWeight="bold" fontSize={36}>
                  Alumno
                </Paragraph>
                <Paragraph color="white" fontSize={14} fontWeight="600">
                  Gestiona tus cursos y actividades{'\n'}diarias de la
                  Universidad.
                </Paragraph>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View height={20} />

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('HomeStackScreen', { screen: 'NewsScreen' })}>
          <View
            width="100%"
            flexDirection="row"
            justifyContent="center"
            flex={1}>
            <View width="90%" position="relative">
              <Image
                source={require('../../../../assets/images/bg-rol-public.png')}
                resizeMode="cover"
                style={{ borderRadius: 20 }}
              />
              <View position="absolute" bottom={20} left={30}>
                <Paragraph color="white" fontWeight="bold" fontSize={36}>
                Público
                </Paragraph>
                <Paragraph color="white" fontSize={14} fontWeight="600">
                Entérate de todas las noticias y{'\n'}eventos que tenemos en la USMP.
                </Paragraph>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View height={30} />
      </View>
    </>
  )
}

export default RolScreen
