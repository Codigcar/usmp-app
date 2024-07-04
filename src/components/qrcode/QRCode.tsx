import QRCodeRN, { QRCodeProps } from 'react-native-qrcode-svg'

const QRcode: React.FC<QRCodeProps> = (props) => {
  return <QRCodeRN {...props} />
}

export default QRcode
