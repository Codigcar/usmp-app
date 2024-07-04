import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { Linking, PermissionsAndroid, Platform } from 'react-native'

type Status = 'enabled' | 'disabled'
type RemoteKeys = {
  auth_oauth: Status
  interstitial_home?: Status
  category_filter: string
  default_categories: string
  ad_news_list: string
}

const NAVIGATION_IDS = ['home', 'post', 'settings'];

function buildDeepLinkFromNotificationData(data:any) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === 'home') {
    return 'myapp://home';
  }
  if (navigationId === 'settings') {
    return 'myapp://settings';
  }
  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `myapp://post/${postId}`
  }
  console.warn('Missing postId')
  return null
}

function handleDeepLink(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  if (!remoteMessage.data) return
  const pathDeepLink = remoteMessage.data?.deeplink 
  if(!pathDeepLink) return
  Linking.openURL(pathDeepLink)
}

export async function requestUserPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
  }

  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  return enabled
}

export function initBackgroundMessageHandler(): void {
  messaging().setBackgroundMessageHandler(Promise.resolve)
}

export function initForegroundMessageHandler() {
  messaging().registerDeviceForRemoteMessages().then(() => {
    messaging().getToken().then((token) => {
     // only android
     console.log('FCM: ',token)
   }).catch((err) => console.error(err))
  }).catch(err => console.log('erro: ',err))


   // Manejar cuando se hace clic en la notificación en segundo plano (cuando la app está cerrada)
   messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', JSON.stringify(remoteMessage));
    handleDeepLink(remoteMessage);
  });

  // cuando el App está totalmente cerrado (no en segundo plano)
  messaging().getInitialNotification().then(remoteMessage => {
    console.log('Notification caused app to open from quit state:', JSON.stringify(remoteMessage));
    if(!remoteMessage) return
    handleDeepLink(remoteMessage);
  });


  const unSubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
  })
  return unSubscribe
}
