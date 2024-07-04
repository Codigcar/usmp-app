import { ViewStyle } from 'react-native'

import Card from '../../../../components/card'
import { IconFolder, IconTriangleRight } from '../../../../assets/icons'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  title: string
  subTitle: string
  isExpanded?: boolean
}

const CourseMaterialItem: React.FC<Props> = ({
  title,
  subTitle,
}) => {
  return (
      <View flexDirection="row" alignItems="center">
        <IconFolder />
        <View width={10} />
        <View flex={1}>
          <Paragraph fontWeight="600" color="black">
            {title}
          </Paragraph>
          <Paragraph>{subTitle}</Paragraph>
        </View>
        <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
      </View>
  )
}

export default CourseMaterialItem
