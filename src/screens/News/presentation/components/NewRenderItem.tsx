import { TouchableWithoutFeedback } from 'react-native'
import {
  IconCalendar,
  IconFavorite,
  IconLocalization,
} from '../../../../assets/icons'
import { View } from '../../../../components/box'
import Card from '../../../../components/card'
import Image from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'
import { Source } from 'react-native-fast-image'

type Props = {
  onPress: () => void
  title: string
  subTitle: string
  date: string
  image: number | Source | undefined
}

const NewRenderItem: React.FC<Props> = ({
  image,
  onPress,
  title,
  subTitle,
  date,
}) => {
  return (
    <Card.Shadow flexDirection="row" padding="0">
      <TouchableWithoutFeedback onPress={onPress}>
        <View flexDirection="row">
          <View>
            <Image
              source={image}
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
            <Paragraph>{date}</Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Card.Shadow>
  )
}

export default NewRenderItem
