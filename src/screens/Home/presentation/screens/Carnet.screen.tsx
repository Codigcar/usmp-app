import {
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
  IconClose,
  IconLogoUSMP,
  IconTriangleBottom,
} from '../../../../assets/icons'
import { SafeAreaView, ScrollView, View } from '../../../../components/box'
import { AvatarImage } from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'
import { useAuth, useStudyPlan } from '../../../../context'
import QRcode from '../../../../components/qrcode/QRCode'
import Collapse from '../../../../components/collapse'
import useCarnetInteractor from './Carnet.interactor'
import Loading from '../../../../components/loading'

type Props = {
  typeBg: string
  value: string
  children: JSX.Element
}

const ViewBG: React.FC<Props> = ({ typeBg, value, children }) => {
  if (typeBg === '') return
  if (typeBg === 'Color') {
    return (
      <View
        flex={1}
        alignItems="center"
        style={{ backgroundColor: value, paddingBottom: 300 }}>
        {children}
      </View>
    )
  }

  return (
    <ImageBackground
      style={{ flex: 1, alignItems: 'center' }}
      source={{ uri: value }}
      resizeMode="cover">
      {children}
    </ImageBackground>
  )
}

const CarnetScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const { user } = useAuth()
  const { studyPLanList, studyPlanSelect, onChangeStudyPlanSelect } =
    useStudyPlan()
  const { carnet, isLoading } = useCarnetInteractor()

  return (
    <>
      <SafeAreaView edges={['top']} bg="white" />

      <ScrollView flex={1} bg="white">
        <ViewBG
          typeBg={carnet?.data.background.type ?? 'Color'}
          value={carnet?.data.background.value ?? '#fff'}>
          <>
            <View height={30} />
            <View>
              <IconLogoUSMP />
            </View>
            <View my="2">
              <AvatarImage
                size={104}
                imageURL={
                  user?.imageUrl ??
                  'https://turkeyanaclinic.com/wp-content/uploads/2023/05/Baby-Face-02.jpg'
                }
              />
            </View>
            <Paragraph fontSize={20} fontWeight="600" color="black">
              {user?.name}
            </Paragraph>
            <Paragraph fontSize={20} fontWeight="600" color="black">
              {user?.lastName}
            </Paragraph>
            <Paragraph fontWeight="600">Num. de Matrícula</Paragraph>
            <Paragraph>{user?.code}</Paragraph>

            <View height={10} />
            <QRcode value={user?.code} size={164} />
            <View height={30} />

            <Collapse.Container>
              <Collapse.Header>
                <View flexDirection="row" alignItems="center">
                  <Paragraph fontWeight="600" color="primary">
                    {studyPlanSelect?.name}
                  </Paragraph>
                  <View width={10} />
                  <IconTriangleBottom fill="#BD1714" stroke="#BD1714" />
                </View>
              </Collapse.Header>
              <Collapse.Body>
                <View py="1">
                  {studyPLanList.map((item) => (
                    <View key={item.id}>
                      <TouchableOpacity
                        onPress={() => {
                          const isCurrent = item.id === studyPlanSelect?.id
                          if (isCurrent) return
                          onChangeStudyPlanSelect(item)
                        }}>
                        <View>
                          <Paragraph textAlign="center">{item.name}</Paragraph>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </Collapse.Body>
            </Collapse.Container>

            <View height={20} />
            <TouchableWithoutFeedback onPress={navigation.goBack}>
              <View>
                <IconClose />
              </View>
            </TouchableWithoutFeedback>
            <View height={30} />
          </>
        </ViewBG>
      </ScrollView>

      {isLoading ? <Loading /> : null}
    </>
  )
}
export default CarnetScreen
