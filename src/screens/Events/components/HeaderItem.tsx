import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { View } from '../../../components/box'
import { Paragraph } from '../../../components/typhografic'

type Props = {
  title: string
  first: boolean
  end: boolean
  isSelected: boolean
  onPress: () => void
  isFullWidth?: boolean
}

const HeaderItem: React.FC<Props> = ({
  title,
  first,
  end,
  isSelected,
  onPress,
  isFullWidth = false,
}) => {
  return (
    <View
      flex={isFullWidth ? 1 : 0}
      borderTopStartRadius={first ? 'full' : 'none'}
      borderBottomStartRadius={first ? 'full' : 'none'}
      borderTopEndRadius={end ? 'full' : 'none'}
      borderBottomEndRadius={end ? 'full' : 'none'}
      px="1"
      borderWidth={0.5}
      borderColor="coolGray-400"
      flexDirection="row"
      justifyContent="center"
      bg={isSelected ? 'black-300' : 'transparent'}
      alignItems="center">
      <View>
        <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
          <View>
            <Paragraph
              fontWeight="600"
              color={isSelected ? 'white' : 'coolGray-600'}>
              {title}
            </Paragraph>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default HeaderItem
