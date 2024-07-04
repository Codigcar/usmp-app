import { TouchableWithoutFeedback } from 'react-native'

import { View } from '../../../../components/box'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'

type Props = {
  onPress: () => void
  name: string
  shortName: string
  status: string
  credits: string
  averageCalification: string
}

const CourseItem: React.FC<Props> = ({
  onPress,
  name,
  shortName,
  status,
  credits,
  averageCalification,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card.Shadow>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <View flexDirection="row" alignItems="center">
            <View
              height={32}
              width={32}
              bg="blue-100"
              borderRadius="full"
              justifyContent="center"
              alignItems="center">
              <Paragraph color="white" fontWeight="600">
                {shortName}
              </Paragraph>
            </View>

            <View width={5} />

            <View>
              <Paragraph fontSize={12} fontWeight="600" color="black">
                {name}
              </Paragraph>
              <View flexDirection="row" alignItems="center" pl="0.25">
                <View
                  height={8}
                  width={8}
                  bg="toastSuccess"
                  borderRadius="full"
                />
                <View width={4} />
                <Paragraph fontSize={8} fontWeight="600">
                  {status} |{' '}
                </Paragraph>
                <Paragraph fontSize={12}> {credits} Créditos</Paragraph>
              </View>
            </View>
          </View>

          <View>
            <Paragraph fontWeight="600" fontSize={16} color="black">
              {averageCalification}
            </Paragraph>
          </View>
        </View>
      </Card.Shadow>
    </TouchableWithoutFeedback>
  )
}

export default CourseItem
