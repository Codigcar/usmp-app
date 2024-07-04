import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { IconBell, IconScan, IconShield, IconThreeLines } from '../assets/icons'
import { SafeAreaView, View } from '../components/box'

type Props = {
  bottomAction?: any
  title?: () => JSX.Element
  isScanner?: boolean
  isBell?: boolean
  isThreeLines?: boolean
  isShield?: boolean
  SuffixComponent?: React.ComponentType
}

const HeaderTop: React.FC<Props> = ({
  bottomAction,
  title,
  isScanner,
  isBell,
  isThreeLines,
  isShield = true,
  SuffixComponent,
}) => {
  const navigation: any = useNavigation()

  return (
    <>
      <SafeAreaView edges={['top']} bg="primary" />
      <View
        bg="primary"
        borderBottomEndRadius="xxl"
        borderBottomStartRadius="xxl"
        px="1.25"
        pt="1.25">
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View flexDirection="row" alignItems="center">
            {isShield ? <IconShield /> : null}
            {title ? (
              <>
                <View width={10} />
                {title ? title() : null}
              </>
            ) : null}
          </View>
          <View flexDirection="row" alignItems="center">
            {SuffixComponent ? <SuffixComponent /> : null}
            {isScanner ? <IconScan /> : null}
            <View width={10} />
            {isBell ? (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.push('CoursessStackScreen', {
                    screen: 'MyCourseNotifications',
                  })
                }>
                <View>
                  <IconBell />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            <View width={10} />
            {isThreeLines ? (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <IconThreeLines />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View flex={1} pt="0.5" />
        {/*  */}
        {bottomAction && bottomAction()}
        {/*  */}
        <View height={15} />
      </View>
    </>
  )
}

export default HeaderTop
