import { IconToastSuccess } from '../../../../assets/icons'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'

const Tutorials = () => {
  return (
    <View>
      <Paragraph fontSize={12} color="primary">
        9:30 - 10:30
      </Paragraph>
      <Paragraph fontSize={10}>Aula 405 | Pab. 4</Paragraph>
      <View flexDirection="row" alignItems="center">
        <IconToastSuccess width={8} height={8} />
        <Paragraph fontSize={8} fontWeight="700">CONFIRMADO</Paragraph>
      </View>
    </View>
  )
}

export default Tutorials
