import View from '../../../../components/box/View'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  paymentCount: number
  paymentDate: string
  paymentAmount: number
}

const PendingPaySection: React.FC<Props> = ({
  paymentCount,
  paymentDate,
  paymentAmount,
}) => {
  return (
    <Card.Shadow>
      <>
        <Paragraph fontWeight="600" color="black">
          {paymentCount} Recibos de Pendientes
        </Paragraph>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View flexDirection="row" alignItems="center">
            <View
              height={10}
              width={10}
              backgroundColor="primary"
              borderRadius="full"
              mr="0.25"
              ml="0.25"
            />
            <Paragraph>{`Vencidos: ${paymentDate}`}</Paragraph>
          </View>
          <View flexDirection="row" alignItems="center">
            <Paragraph color="primary">Total: </Paragraph>
            <Paragraph color="black" fontWeight="600">
              S/ {paymentAmount}
            </Paragraph>
          </View>
        </View>
      </>
    </Card.Shadow>
  )
}

export default PendingPaySection
