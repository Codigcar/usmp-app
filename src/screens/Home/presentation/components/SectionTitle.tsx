import { TouchableOpacity, ViewProps } from 'react-native'
import { BoxProps } from '@shopify/restyle'

import View from '../../../../components/box/View'
import { Paragraph } from '../../../../components/typhografic'
import { IconViewAll } from '../../../../assets/icons'
import { Theme } from '../../../../theme'

type Props = {
  title: string
  viewAllOnPress: () => void
}

const SectionTitle: React.FC<Props & ViewProps & BoxProps<Theme>> = ({
  title,
  viewAllOnPress,
  ...styles
}) => {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      {...styles}>
      <Paragraph fontWeight="600" lineHeight={24} color="primary">
        {title}
      </Paragraph>
      <TouchableOpacity onPress={viewAllOnPress}>
        <View flexDirection="row" alignItems="center">
          <Paragraph fontWeight="600" color="primary" fontSize={8}>
            VER TODO{'    '}
          </Paragraph>
          <IconViewAll />
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default SectionTitle
