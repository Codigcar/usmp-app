import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  abbrev: string
  name: string
  code: string
  isActive: boolean
}

const HeaderMenuMyCourses: React.FC<Props> = ({
  abbrev,
  name,
  code,
  isActive,
}) => {
  const [showSubItems, setShowSubItems] = useState<boolean>(false)

  return (
    <TouchableWithoutFeedback onPress={() => setShowSubItems(!showSubItems)}>
      <View
      borderBottomEndRadius='full'
        bg={isActive ? 'trueGray-1000' : 'white'}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px="1">
        <View flexDirection="row" alignItems="center">
          <View
            height={24}
            width={24}
            bg="coolGray-800"
            borderRadius="full"
            justifyContent="center"
            alignItems="center">
            <Paragraph color="white" fontSize={10} fontWeight="600">
              {abbrev}
            </Paragraph>
          </View>
          <View pl="0.5">
            <Paragraph fontWeight="600" fontSize={14}>
              {name}
            </Paragraph>
            <Paragraph fontSize={10}>{code}</Paragraph>
          </View>
        </View>
        <View height={9} width={9} bg="black" borderRadius="full" />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default HeaderMenuMyCourses
