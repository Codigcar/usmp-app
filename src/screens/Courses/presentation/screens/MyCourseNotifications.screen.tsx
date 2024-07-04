import { IconTriangleRight } from '../../../../assets/icons'
import { ScrollView, View } from '../../../../components/box'
import Card from '../../../../components/card'
import DropdownComponent from '../../../../components/input/dropdown'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'

const MyCourseNotificationsScreen: React.FC = () => {
  return (
    <View flex={1} bg="white">
      <View height={20} />

      <ScrollView flex={1} px="1">
        <View height={20} />
        <DropdownComponent />
        <View height={20} />

        <Paragraph color="primary" fontWeight="600">
          Notifications del curso
        </Paragraph>
        <View height={10} />

        <Paragraph>Hoy</Paragraph>
        {[1, 2].map((item, index) => (
          <Card.Shadow key={index}>
            <View flexDirection="row" alignItems="center">
              <View
                width={8}
                height={8}
                bg="blue-100"
                borderRadius="full"
                mr="0.5"
              />
              <View flex={1}>
                <Paragraph fontWeight="600" color="black" fontSize={12}>
                  Clase modificada de aula
                </Paragraph>
                <Paragraph fontSize={10} color="black">
                  La clase de ha cambiado al Aula 502 a la Sección 39A
                </Paragraph>
                <Paragraph fontSize={8} fontWeight="600">
                  HACE 2 HORAS
                </Paragraph>
              </View>
              <View>
                <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
              </View>
            </View>
          </Card.Shadow>
        ))}

        <Paragraph>Ayer</Paragraph>
        {[1, 2].map((item, index) => (
          <Card.Shadow key={index}>
            <View flexDirection="row" alignItems="center">
              <View
                width={8}
                height={8}
                bg="blue-100"
                borderRadius="full"
                mr="0.5"
              />
              <View flex={1}>
                <Paragraph fontWeight="600" color="black" fontSize={12}>
                  Clase modificada de aula
                </Paragraph>
                <Paragraph fontSize={10} color="black">
                  La clase de ha cambiado al Aula 502 a la Sección 39A
                </Paragraph>
                <Paragraph fontSize={8} fontWeight="600">
                  HACE 2 HORAS
                </Paragraph>
              </View>
              <View>
                <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
              </View>
            </View>
          </Card.Shadow>
        ))}
      </ScrollView>
    </View>
  )
}
export default MyCourseNotificationsScreen
