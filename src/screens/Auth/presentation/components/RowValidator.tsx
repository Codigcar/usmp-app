import { IconValidError, IconValidSuccess } from '../../../../assets/icons'
import View from '../../../../components/box/View'
import { Paragraph } from '../../../../components/typhografic'

const RowValidator: React.FC<{
  condition: any
  description: string
}> = ({  condition, description }) => {
  return (
    <View flexDirection="row" alignItems="center">
      {condition ? <IconValidSuccess /> : <IconValidError />}
      <Paragraph fontSize={12}>{`  ${description}`}</Paragraph>
    </View>
  )
}

export default RowValidator
