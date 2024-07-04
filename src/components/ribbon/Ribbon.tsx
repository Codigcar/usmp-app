import { SafeAreaView, View } from '../box'

import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  IconBell,
  IconScan,
  IconShield,
  IconThreeLines,
} from '../../assets/icons'
import RibbonBg from './Ribbon.bg'
import Loading from '../loading'
import { Paragraph } from '../typhografic'

type Props = {
  bottomAction?: any
  isScanner?: boolean
  isBell?: boolean
  isThreeLines?: boolean
  isShield?: boolean
  RightComponent?: React.ComponentType
  title: string
  isLoading?: boolean
}

const Ribbon: React.FC<Props> = ({
  title,
  isShield = true,
  RightComponent,
  isLoading = false,
}) => {
  return (
    <>
      <RibbonBg>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View flexDirection="row" alignItems="center">
            {isShield ? <IconShield /> : null}
            {title ? (
              <>
                <View width={10} />
                <View pt="0.5">
                  <Paragraph color="white" fontWeight="600" fontSize={16}>
                    {title}
                  </Paragraph>
                </View>
              </>
            ) : null}
          </View>
          <View flexDirection="row" alignItems="center">
            {RightComponent ? <RightComponent /> : null}
          </View>
        </View>
      </RibbonBg>
      {isLoading ? <Loading /> : null}
    </>
  )
}

export default Ribbon
