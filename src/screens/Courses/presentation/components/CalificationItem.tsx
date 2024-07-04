import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import Separator from '../../../../components/separator'

type Props = {
  title: string
  subTitle: string
  calification: string
  showSeparator?: boolean
}
const CalificationItem: React.FC<Props> = ({
  title,
  subTitle,
  calification,
  showSeparator = true,
}) => {
  return (
    <View>
      <Paragraph fontSize={12} color="black-300" fontWeight="600">
        {title}
      </Paragraph>
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between">
        <Paragraph fontSize={12}>{subTitle}</Paragraph>
        <Paragraph fontSize={16} fontWeight="600" color="black">
          {calification}
        </Paragraph>
      </View>
      {showSeparator ? (
        <View my="0.5">
          <Separator />
        </View>
      ) : null}
    </View>
  )
}
export default CalificationItem
