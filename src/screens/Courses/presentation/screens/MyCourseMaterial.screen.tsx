import { IconDownload, IconPDF } from '../../../../assets/icons'
import { ScrollView, View } from '../../../../components/box'
import Collapse from '../../../../components/collapse'
import DropdownComponent from '../../../../components/input/dropdown'
import Separator from '../../../../components/separator'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'
import CourseMaterialItem from '../components/CourseMaterialItem'

const MyCourseMaterialScreen: React.FC = () => {
  return (
    <ScrollView flex={1} bg="white">
      <View height={20} />

      <View px="1">
        <DropdownComponent />
        <View height={20} />

        <Paragraph color="primary" fontWeight="600">
          Material del curso
        </Paragraph>

        <View height={10} />
        <DropdownComponent />
        <View height={20} />

        {[1, 2, 3, 4].map((item, index) => (
          <Collapse.Container key={index} disableOpacity hasCardShadow>
            <Collapse.Header>
              <CourseMaterialItem
                title="Nombre de Carpeta 1"
                subTitle="Contiene 23 archivos"
              />
            </Collapse.Header>
            <Collapse.Body>
              <>
                <View height={15} />
                {[1, 2, 3].map((item) => (
                  <View>
                    <View flexDirection="row" alignItems="center">
                      <IconPDF />
                      <View width={10} />
                      <View flex={1}>
                        <Paragraph fontWeight="600" color="black">
                          Las Celulas.pdf
                        </Paragraph>
                        <Paragraph fontSize={12}>
                          Subido 2 octubre de 2023
                        </Paragraph>
                      </View>
                      <IconDownload />
                    </View>
                    <View my="0.5">
                      <Separator />
                    </View>
                  </View>
                ))}
                <View height={15} />
              </>
            </Collapse.Body>
          </Collapse.Container>
        ))}
      </View>
    </ScrollView>
  )
}

export default MyCourseMaterialScreen
