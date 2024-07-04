import { TouchableWithoutFeedback } from 'react-native'
import {
  IconCalendar,
  IconFavorite,
  IconLocalization,
} from '../../../assets/icons'
import { View } from '../../../components/box'
import Card from '../../../components/card'
import Image from '../../../components/image'
import { Paragraph } from '../../../components/typhografic'

type Props = {
  onPress: () => void
  title: string
  subTitle: string
  ubication: string
  date: string
}

const RenderItem: React.FC<Props> = ({
  onPress,
  title,
  subTitle,
  ubication,
  date,
}) => {
  return (
    <Card.Shadow flexDirection="row" padding="0">
      <TouchableWithoutFeedback onPress={onPress}>
        <View flexDirection="row">
          <View>
            <Image
              source={require('../../../assets/images/bg-rol-student.png')}
              style={{
                width: 90,
                height: 99,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </View>
          <View width={10} />
          <View py="0.75" width="67%">
            <Paragraph
              fontWeight="600"
              color="black"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ overflow: 'hidden' }}>
              {title}
            </Paragraph>
            <Paragraph>{subTitle}</Paragraph>
            <View height={3} />
            <View flexDirection="row">
              <View width={2} />
              <IconLocalization />
              <View width={5} />
              <Paragraph>{ubication}</Paragraph>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <View flexDirection="row">
                <IconCalendar />
                <View width={5} />
                <Paragraph>{date}</Paragraph>
              </View>
              <IconFavorite stroke="#9F9D9B" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Card.Shadow>
  )
}

export default RenderItem
