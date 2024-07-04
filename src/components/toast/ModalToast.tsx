import { Modal, TouchableOpacity } from 'react-native'
import { Paragraph } from '../typhografic'
import { View } from '../box'
import {
  IconCalendar,
  IconCalendarEmpty,
  IconCalendarLeft,
  IconCalendarReloj,
  IconCalendarRight,
  IconCheck,
  IconCheckWhite,
  IconClose,
  IconReloj,
  IconUbication,
  IconValidSuccess,
} from '../../assets/icons'
import Button from '../button'

type Props = {
  onRequestClose: () => void
  title?: string
  description?: string
}

const ModalToast: React.FC<Props> = ({
  onRequestClose,
  title = 'Reserva Confirmada',
  description = 'Revisa el estado de tu reserva en la vista',
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible
      onRequestClose={onRequestClose}>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
        <View
          bg="white"
          width="90%"
          borderRadius="xxl"
          flexDirection="column"
          px="1"
          pb="1.5"
          alignItems="center">
          <View height={20} />
          <View flexDirection="row-reverse" alignItems="flex-end" width="90%">
            <TouchableOpacity onPress={onRequestClose}>
              <IconClose />
            </TouchableOpacity>
          </View>
          <View height={20} />
          <IconCalendarReloj />
          <View height={20} />
          <Paragraph fontWeight="600">{title}</Paragraph>
          <Paragraph textAlign="center">{description}</Paragraph>
          {/* <Paragraph>"Mis Próximas reservas"</Paragraph> */}
          <View height={40} />
          <View justifyContent="flex-start">
            <View flexDirection="row">
              <IconUbication />
              <View width={10} />
              <Paragraph fontWeight="600">Sede Biblioteca Central</Paragraph>
            </View>
            <View flexDirection="row">
              <IconCalendar />
              <View width={10} />
              <Paragraph>12 de octubre de 2023</Paragraph>
            </View>
            <View flexDirection="row">
              <IconReloj />
              <View width={10} />
              <Paragraph>9:30 - 10:30</Paragraph>
            </View>
          </View>
          <View height={40} />
          <Button onPress={onRequestClose} title="Volver" type="outline" />
        </View>
      </View>
    </Modal>
  )
}

export default ModalToast
