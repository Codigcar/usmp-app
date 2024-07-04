import { useRef } from 'react'
import View from '../components/box/View'
import Paragraph from '../components/typhografic'
import { Modalize } from 'react-native-modalize'
import { TouchableWithoutFeedback } from 'react-native'

const MenuItem = () => {
  return (
    <View flexDirection="row" alignItems="center">
      <View
        height={24}
        width={24}
        backgroundColor="coolGray-400"
        borderRadius="full"
      />
      <View>
        <Paragraph>Biología</Paragraph>
        <Paragraph>Cod: 9999999</Paragraph>
      </View>
    </View>
  )
}

const MenuHeader = ({ children }: any) => {
  const modalizeRef = useRef<Modalize>(null)

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  return (
    <View
      backgroundColor="white"
      pt="1"
      pb="1"
      paddingHorizontal="0.75"
      flex={1}>
      <View>
        <Paragraph>Visualiza otro curso</Paragraph>
      </View>
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <TouchableWithoutFeedback onPress={onOpen}>
        <Paragraph>Open the modal</Paragraph>
      </TouchableWithoutFeedback>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="outside">
        <Paragraph>holaa</Paragraph>
        <Paragraph>holaa</Paragraph>
        <Paragraph>holaa</Paragraph>
        <Paragraph>holaa</Paragraph>
        <Paragraph>holaa</Paragraph>
        <Paragraph>holaa</Paragraph>
      </Modalize>
    </View>
  )
}

export default MenuHeader
