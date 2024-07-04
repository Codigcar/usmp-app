import { TouchableWithoutFeedback } from 'react-native'
import { IconCheckWhite } from '../../../../assets/icons'
import { View } from '../../../../components/box'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  date: string
  hours: string
  sede: string
  status: string
}

const IconSuccess: React.FC<{ status: string }> = ({ status }) => {
  return (
    <View flexDirection="row" alignItems="center">
      <View
        height={8}
        width={8}
        bg="toastSuccess"
        borderRadius="full"
        justifyContent="center"
        alignItems="center">
        <IconCheckWhite height={5} width={5} />
      </View>
      <View pl="0.25">
        <Paragraph color="black" fontSize={8} fontWeight="600">
          {status}
        </Paragraph>
      </View>
    </View>
  )
}

const IconValidando: React.FC<{ status: string }> = ({ status }) => {
  return (
    <View flexDirection="row" alignItems="center">
      <View
        height={8}
        width={8}
        bg="gray-900"
        borderRadius="full"
        justifyContent="center"
        alignItems="center"
      />
      <View pl="0.25">
        <Paragraph color="gray-900" fontSize={8} fontWeight="600">
          {status}
        </Paragraph>
      </View>
    </View>
  )
}

const IconError: React.FC<{ status: string }> = ({ status }) => {
  return (
    <View flexDirection="row" alignItems="center">
      <View
        height={8}
        width={8}
        bg="primary"
        borderRadius="full"
        justifyContent="center"
        alignItems="center"
      />
      <View pl="0.25">
        <Paragraph color="black" fontSize={8} fontWeight="600">
          {status}
        </Paragraph>
      </View>
    </View>
  )
}

const BookingListItem: React.FC<Props> = ({ date, hours, sede, status }) => {
  return (
    <Card.Shadow mx="1">
      <View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <View flexDirection="row" alignItems="center">
            <Paragraph color="black" fontWeight="600">
              {date}
            </Paragraph>
            <View width={5} />
            <Paragraph fontSize={12}>{hours}</Paragraph>
          </View>
          {status === 'Confirmado' ? <IconSuccess status={status} /> : null}
          {status === 'Validando' ? <IconValidando status={status} /> : null}
          {status === 'Cancelado' ? <IconError status={status} /> : null}
        </View>
        <Paragraph color="black" fontWeight="600" fontSize={12}>
          Reserva de Cubículo
        </Paragraph>
        <Paragraph fontSize={12}>{sede}</Paragraph>
      </View>
    </Card.Shadow>
  )
}

export default BookingListItem
