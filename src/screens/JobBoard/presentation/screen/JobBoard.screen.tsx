import WebView from 'react-native-webview'
import { View } from '../../../../components/box'
import { MenuHeaderV2 } from '../../../../containers'

const JobBoardScreen: React.FC = () => {
  return (
    <View flex={1}>
      <MenuHeaderV2 />
      <WebView
        source={{ uri: 'https://jobboard.universia.net/usmp' }}
        style={{ flex: 1 }}></WebView>
    </View>
  )
}

export default JobBoardScreen
