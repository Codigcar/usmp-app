import { TouchableWithoutFeedback, ViewStyle } from 'react-native'

import { View } from '../../../../components/box'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'
import { IconTriangleRight, IconTriangleTop } from '../../../../assets/icons'
import { useState } from 'react'

type Props = {
  PrefixComponent?: React.ComponentType
  SuffixComponent?: React.ComponentType
  title: string
  subTitle: string
  children?: React.ReactNode
  onPress?: () => void
}

const disabledShadow: ViewStyle = {
  marginBottom: 0,
  borderRadius: 0,
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
}

const getIconTriangle = (showSubItems: boolean) => {
  if (showSubItems)
    return (
      <IconTriangleTop fill="#BD1714" stroke="#BD1714" width={10} height={10} />
    )
  return (
    <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" width={10} height={10} />
  )
}

const MyCourseDetailSectionItem: React.FC<Props> = ({
  PrefixComponent,
  SuffixComponent,
  title,
  subTitle,
  children,
  onPress,
}) => {
  const [showSubItems, setShowSubItems] = useState<boolean>(false)

  const onPressDefault = () => setShowSubItems(!showSubItems)

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress ?? onPressDefault}>
        <Card.Shadow style={showSubItems && disabledShadow}>
          <View flexDirection="row" alignItems="center">
            {PrefixComponent ? <PrefixComponent /> : null}
            <View flex={1}>
              <Paragraph color="primary" fontWeight="700">
                {title}
              </Paragraph>
              <Paragraph>{subTitle}</Paragraph>
            </View>
            {SuffixComponent ? (
              <SuffixComponent />
            ) : (
              getIconTriangle(showSubItems)
            )}
          </View>
        </Card.Shadow>
      </TouchableWithoutFeedback>

      {showSubItems ? children : null}
    </>
  )
}

export default MyCourseDetailSectionItem
