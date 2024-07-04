import { IconCalendar, IconLocalization } from '../../../../assets/icons'
import View from '../../../../components/box/View'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  imageUrl: string
  title: string
  ubication: string
  date: string
}
const NextEventsSection: React.FC<Props> = ({
  imageUrl,
  title,
  ubication,
  date,
}) => {
  return (
    <Card.Shadow width={160} padding="0" mr="1">
      <Card.Image imageUrl={imageUrl}>
        <View paddingHorizontal="0.75" paddingBottom="0.5">
          <View height={10} />
          <Paragraph color="black" fontWeight="600" fontSize={12}>
            {title}
          </Paragraph>
          <View height={5} />

          <View flexDirection="row" testID="@home/localization">
            <IconLocalization />
            <View width={5} />
            <Paragraph>{ubication}</Paragraph>
          </View>

          <View flexDirection="row" testID="@home/calendar">
            <IconCalendar />
            <View width={5} />
            <Paragraph>{date}</Paragraph>
          </View>
        </View>
      </Card.Image>
    </Card.Shadow>
  )
}

export default NextEventsSection
