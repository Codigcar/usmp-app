import { useState } from 'react'
import { TouchableWithoutFeedback, ViewStyle } from 'react-native'

import { IconTriangleRight, IconTriangleTop } from '../../../../assets/icons'
import View from '../../../../components/box/View'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  children: React.ReactNode,
  name: string,
  code: string,
  abbrev: string
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
      <IconTriangleTop fill="#9F9D9B" stroke="#9F9D9B" width={10} height={10} />
    )
  return (
    <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" width={10} height={10} />
  )
}

const CourseSectionItem: React.FC<Props> = ({ children, name, code, abbrev }) => {
  const [showSubItems, setShowSubItems] = useState<boolean>(false)

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowSubItems(!showSubItems)}>
        <Card.Shadow style={showSubItems && disabledShadow}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <View flexDirection="row" alignItems="center">
              <View
                height={48}
                width={48}
                bg="coolGray-800"
                borderRadius="full"
                justifyContent="center"
                alignItems="center">
                <Paragraph color="white" fontSize={20} fontWeight="600">
                  {abbrev}
                </Paragraph>
              </View>
              <View pl="0.5">
                <Paragraph fontWeight="600">{name}</Paragraph>
                <Paragraph fontSize={10}>{code}</Paragraph>
              </View>
            </View>
            <View>{getIconTriangle(showSubItems)}</View>
          </View>
        </Card.Shadow>
      </TouchableWithoutFeedback>

      {showSubItems ? children : null}
    </>
  )
}

export default CourseSectionItem
