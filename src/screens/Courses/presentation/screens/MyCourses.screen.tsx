import { TouchableOpacity } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'

import ScrollView from '../../../../components/box/ScrollView'
import View from '../../../../components/box/View'
import DropdownComponent from '../../../../components/input/dropdown'
import CourseSectionItem from '../components/CourseSectionItem'
import Ribbon from '../../../../components/ribbon'
import useHomeInteractor from '../../../Home/presentation/screens/Home.interactor'
import Loading from '../../../../components/loading'
import { Paragraph } from '../../../../components/typhografic'
import { CourseSectionSubItem } from '../components'
import { CoursessStackScreenProps } from '../../../../routes/types'
import { useEffect } from 'react'
import { useStudyPlan } from '../../../../context'
import { convertToDataDropdown } from '../../infrastructure/utils'
import { IconBell, IconThreeLines } from '../../../../assets/icons'

const MyCoursesScreen: React.FC = () => {
  const navigation =
    useNavigation<CoursessStackScreenProps<'MyCoursesScreen'>['navigation']>()

  const {
    studyPlanSelect,
    studyPLanList,
    onChangeCourseSelect,
    onChangeEvent,
  } = useStudyPlan()
  const { isLoading, coursesList } = useHomeInteractor()

  useEffect(() => {}, [])

  return (
    <ScrollView bg="white" flex={1}>
      <Ribbon.base
        title="Mis Cursos"
        RightComponent={() => (
          <View flexDirection="row">
            <TouchableOpacity
              onPress={() => navigation.push('MyCourseNotifications')}>
              <IconBell />
            </TouchableOpacity>
            <View width={10} />
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconThreeLines />
            </TouchableOpacity>
          </View>
        )}
      />

      <View px="1">
        <View height={20} />
        <DropdownComponent
          placeholder="Plan de estudio"
          data={convertToDataDropdown(studyPLanList) as any}
          defaultValue={convertToDataDropdown(studyPlanSelect!) as any}
        />

        <View height={20} />

        <View flexDirection="row" justifyContent="space-between">
          <Paragraph color="primary" fontWeight="600">
            Cursando
          </Paragraph>
          <Paragraph fontWeight="600">{`Año ${studyPlanSelect?.year} - Semestre ${studyPlanSelect?.period}`}</Paragraph>
        </View>
        <View height={10} />

        {coursesList.map((item, index) => (
          <CourseSectionItem
            key={index}
            name={item.name}
            abbrev={item.abreviation}
            code={item.code}>
            {item.events.map((subItem) => (
              <CourseSectionSubItem
                key={subItem.id}
                onPress={() => {
                  onChangeCourseSelect(item)
                  onChangeEvent(subItem)
                  navigation.push('CourseDetailScreen')
                }}
                name={subItem.name}
              />
            ))}
          </CourseSectionItem>
        ))}
      </View>
      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default MyCoursesScreen
