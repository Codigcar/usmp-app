import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  title: string
  body: string
  textAlign?: 'center' | 'left'
}
const SectionInfo: React.FC<Props> = ({ title, body, textAlign = 'left' }) => {
  return (
    <View>
      <Paragraph color="black" fontWeight="600">
        {title}
      </Paragraph>
      <Paragraph textAlign={textAlign}>{body}</Paragraph>
    </View>
  )
}

export default SectionInfo
