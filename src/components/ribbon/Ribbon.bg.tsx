import { SafeAreaView, View } from '../box'

type Props = {
  children: JSX.Element
}

const RibbonBg: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SafeAreaView edges={['top']} bg="primary" />
      <View
        bg="primary"
        borderBottomEndRadius="xxl"
        borderBottomStartRadius="xxl"
        px="1.25"
        pt="1.25">
        {children}
        <View height={15} />
      </View>
    </>
  )
}
export default RibbonBg
