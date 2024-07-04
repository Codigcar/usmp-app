import { useNavigation } from '@react-navigation/native'

import { ScrollView, View } from '../../../components/box'
import { Paragraph } from '../../../components/typhografic'
import { CalificationsStackScreenProps } from '../../../routes/types'
import { CourseItem } from './components'
import { useStudyPlan } from '../../../context'
import { convertToDataDropdown } from '../../Courses/infrastructure/utils'
import DropdownComponent from '../../../components/input/dropdown'
import useMyCalificationsMainInteractor from './MyCalificationsMain.interactor'
import Ribbon from '../../../components/ribbon'

const MyCalificationMainScreen: React.FC = () => {
  const navigation =
    useNavigation<
      CalificationsStackScreenProps<'MyCalificationMainScreen'>['navigation']
    >()

  const { studyPLanList, studyPlanSelect, onChangeCourseSelect } =
    useStudyPlan()
  const {
    periods,
    isLoading,
    califications,
    onChangeValueDropdown,
    valueDropdown,
  } = useMyCalificationsMainInteractor()

  return (
    <ScrollView flex={1} bg="white">
      <Ribbon.base title="Mis Notas" isLoading={isLoading} />
      <View px="1">
        <View height={20} />
        <DropdownComponent
          placeholder="Plan de estudio"
          data={convertToDataDropdown(studyPLanList) as any}
          defaultValue={convertToDataDropdown(studyPlanSelect!) as any}
        />
        <View height={20} />
        {valueDropdown ? (
          <DropdownComponent
            placeholder="Periodo temporal"
            data={
              convertToDataDropdown(periods, {
                labelKey: 'fullPeriod',
                valueKey: 'id',
              }) as any
            }
            defaultValue={valueDropdown}
            onChange={onChangeValueDropdown}
          />
        ) : null}

        <View height={20} />

        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          py="0.75">
          <Paragraph fontSize={28} fontWeight="500" color="black">
            {califications?.data.generalAvergae}
          </Paragraph>
          <View width={10} />
          <Paragraph fontWeight="600" color="black">
            Promedio general
          </Paragraph>
        </View>

        <Paragraph color="primary" fontWeight="600">
          Promedio del periodo
        </Paragraph>

        <View height={10} />

        <View
          borderWidth={1}
          borderColor="coolGray-300"
          px="1"
          py="0.75"
          borderRadius="xl"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <View>
            <Paragraph fontWeight="600" color="black">
              Créditos Matriculados
            </Paragraph>
            <Paragraph>{califications?.data.periodCredits} créditos</Paragraph>
          </View>
          <View>
            <Paragraph fontSize={20} fontWeight="600" color="black">
              {califications?.data.periodAverage}
            </Paragraph>
          </View>
        </View>

        <View height={30} />

        {/* Cursos */}
        <Paragraph color="primary" fontWeight="600">
          Cursos
        </Paragraph>

        <View height={15} />

        {califications?.data.coursesGrades.map((item) => (
          <CourseItem
            key={item.id}
            onPress={() => {
              onChangeCourseSelect(item)
              navigation.push('CalificationDetailScreen')
            }}
            name={item.name}
            shortName={item.abreviation}
            status={item.status}
            credits={item.credits}
            averageCalification={item.averageGrade}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default MyCalificationMainScreen
