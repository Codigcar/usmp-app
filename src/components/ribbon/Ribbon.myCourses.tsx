import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { IconBell, IconMenuHeaderMyCourses } from '../../assets/icons'
import { SafeAreaView, View } from '../box'
import { Paragraph } from '../typhografic'
import RibbonBg from './Ribbon.bg'
import { ICourseByStudyPlanIdResponseData } from '../../screens/Home/domain/dtos/listCoursesByStudyPlanId.response'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  title: string
  subTitle: string
  coursesList: ICourseByStudyPlanIdResponseData[]
}

type PropsHeaderMenuMyCourses = {
  abbrev: string
  name: string
  code: string
  isActive: boolean
}

const HeaderMenuMyCourses: React.FC<PropsHeaderMenuMyCourses> = ({
  abbrev,
  name,
  code,
  isActive,
}) => {
  const [showSubItems, setShowSubItems] = useState<boolean>(false)

  return (
    <TouchableWithoutFeedback onPress={() => setShowSubItems(!showSubItems)}>
      <View
        borderBottomEndRadius="full"
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

const HeaderWhite: React.FC<{
  coursesList: ICourseByStudyPlanIdResponseData[]
  onToggleShow: () => void
}> = ({ coursesList, onToggleShow }) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal transparent visible onRequestClose={() => console.log('cerrado')}>
      <TouchableWithoutFeedback onPress={onToggleShow}>
        <View flex={1} bg="blackWithOpacity">
          <View
            bg="white"
            pb="2"
            borderBottomEndRadius="xxl"
            borderBottomStartRadius="xxl">
            <View height={insets.top} />
            <Paragraph color="primary" fontWeight="bold" textAlign="center">
              Visualiza otro curso
            </Paragraph>
            <View height={10} />
            {coursesList.map((item, index) => (
              <HeaderMenuMyCourses
                key={item.id}
                name={item.name}
                abbrev={item.abreviation}
                code={item.code}
                isActive={true}
              />
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const RibbonMyCourses: React.FC<Props> = ({ title, subTitle, coursesList }) => {
  const [showMenuWhite, setShowMenuWhite] = useState(false)
  const navigation: any = useNavigation()

  const onToggleShow = () => {
    setShowMenuWhite(!showMenuWhite)
  }

  return (
    <View>
      {showMenuWhite ? (
        <HeaderWhite coursesList={coursesList} onToggleShow={onToggleShow} />
      ) : null}
      <RibbonBg>
        <View
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center">
          <View>
            <Paragraph color="white" fontWeight="600" fontSize={16}>
              {title}
            </Paragraph>
            <Paragraph color="white">{subTitle}</Paragraph>
          </View>
          <View flexDirection="row">
            <TouchableOpacity onPress={onToggleShow}>
              <IconMenuHeaderMyCourses />
            </TouchableOpacity>
            <View width={10} />
            <TouchableOpacity
              onPress={() => navigation.push('MyCourseNotifications')}>
              <IconBell />
            </TouchableOpacity>
          </View>
        </View>
      </RibbonBg>
    </View>
  )
}

export default RibbonMyCourses
