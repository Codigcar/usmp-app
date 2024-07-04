import { IconClose, IconLogoUSMP } from '../../../../assets/icons'
import View from '../../../../components/box/View'

type Props = {
  onPressIconClose: () => void
}

const Header = ({ onPressIconClose }: Props) => {
  return (
    <>
      <View height={30} />
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <IconLogoUSMP />
        <IconClose onPress={onPressIconClose} />
      </View>
    </>
  )
}
export default Header
