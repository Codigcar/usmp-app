import { TouchableWithoutFeedback } from 'react-native'
import View from '../../../../components/box/View'
import Card from '../../../../components/card'
import { Paragraph } from '../../../../components/typhografic'
import { ICourseByStudyPlanIdResponseData } from '../../domain/dtos/listCoursesByStudyPlanId.response'

type Props = {
  course: ICourseByStudyPlanIdResponseData
  disableMarginRight: boolean
  onPress: () => void
}
const CoursesSection: React.FC<Props> = ({ disableMarginRight, course, onPress }) => {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={onPress}>
        <Card.Shadow
          bg="white"
          flex={1}
          mr={disableMarginRight ? '0' : '1'}
          borderRadius="xl"
          py="1"
          width={142}>
          <>
            <View
              bg="primary"
              borderRadius="full"
              width={24}
              height={24}
              justifyContent="center"
              alignItems="center">
              <Paragraph color="white" fontWeight="bold">
                {course.abreviation}
              </Paragraph>
            </View>
            <View pt="0.25">
              <Paragraph color="black" fontWeight="bold">
                {course.name}
              </Paragraph>
              <Paragraph>{course.code}</Paragraph>
            </View>
          </>
        </Card.Shadow>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default CoursesSection
