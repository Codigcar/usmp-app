import Button from '../../../../components/button'
import { IconCalendarEmpty } from '../../../../assets/icons'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'

const BookingEmpty: React.FC = () => {
  return (
    <View flex={1}>
      <View
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}>
        <IconCalendarEmpty />
        <View height={15} />
        <Paragraph
          textAlign="center"
          fontSize={16}
          fontWeight="600"
          color="black">
          No hay reservas
        </Paragraph>
        <View px="1.5" pt="0.75">
          <Paragraph textAlign="center" fontWeight="400" fontSize={15}>
            Una vez que realizas una reserva podrás visualizarla en esta sección
          </Paragraph>
        </View>

        <View width={230} pt="2">
          <Button title="Crear nueva" type="primary" onPress={() => {}} />
        </View>
      </View>
    </View>
  )
}

export default BookingEmpty
