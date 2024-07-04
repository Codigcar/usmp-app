import { IconLogoMoventi, IconLogoUSMP } from '../../../../assets/icons'
import View from '../../../../components/box/View'
import Paragraph from '../../../../components/typhografic/Paragraph'

const SplashScreen = () => {
  return (
    <View flex={1} position="relative">
      <View flex={1} justifyContent="center" alignItems="center">
        <IconLogoUSMP width={288} height={88} />
      </View>
      <View
        position="absolute"
        justifyContent="center"
        alignItems="center"
        left={0}
        bottom={35}
        right={0}>
        <IconLogoMoventi />
      </View>
    </View>
  )
}

export default SplashScreen
