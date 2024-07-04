import { useNavigation, useRoute } from '@react-navigation/native'
import { IconCalendar } from '../../../assets/icons'
import { ScrollView, View } from '../../../components/box'
import Button from '../../../components/button'
import Image from '../../../components/image'
import { Paragraph } from '../../../components/typhografic'
import { HomeStackScreenProps } from '../../../routes/types'

const NewDetailScreen: React.FC = () => {
  const route = useRoute<HomeStackScreenProps<'NewDetailScreen'>['route']>()
  const { newInfo } = route.params

  return (
    <ScrollView flex={1} bg="white">
      <View>
        <View width="100%" height={291}>
          <Image
            source={require('../../../assets/images/image-mock2.png')}
            resizeMode="contain"
          />
        </View>
        <View px="1">
          <View height={20} />
          <Paragraph color="primary" fontSize={20} fontWeight="600">
            {newInfo.title}
          </Paragraph>
          <Paragraph color="black">{newInfo.subtitle}</Paragraph>
          <View height={15} />
          <Button
            width={160}
            title="COMPARTIR"
            onPress={() => {}}
            icon={() => <IconCalendar />}
            type="primary"
          />
          <View height={20} />
          <Paragraph>{newInfo.summary}</Paragraph>
        </View>
      </View>
    </ScrollView>
  )
}

export default NewDetailScreen
