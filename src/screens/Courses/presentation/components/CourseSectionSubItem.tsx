import { TouchableWithoutFeedback } from 'react-native'
import { IconTriangleRight } from '../../../../assets/icons'
import { View } from '../../../../components/box'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  onPress: () => void
  name: string
}

const CourseSectionSubItem: React.FC<Props> = ({
  onPress,
  name,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card.Shadow>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <View flexDirection="row" alignItems="center">
            <View pl="0.5">
              <Paragraph fontWeight="600">{name}</Paragraph>
            </View>
          </View>
          <View>
            <IconTriangleRight
              fill="#9F9D9B"
              stroke="#9F9D9B"
              width={10}
              height={10}
            />
          </View>
        </View>
      </Card.Shadow>
    </TouchableWithoutFeedback>
  )
}

export default CourseSectionSubItem
