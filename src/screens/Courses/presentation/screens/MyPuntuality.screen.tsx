import { ScrollView, View } from '../../../../components/box'
import DropdownComponent from '../../../../components/input/dropdown'
import Loading from '../../../../components/loading'
import Separator from '../../../../components/separator'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'
import { useStudyPlan } from '../../../../context'
import useDropdown from '../../../../hooks/useDropdown'
import { convertToDataDropdown } from '../../infrastructure/utils'
import usePuntualityInteractor from './MyPuntuality.interactor'

const MyPuntualityScreen: React.FC = () => {
  const { courseSelect, eventByCourseSelect } = useStudyPlan()
  const { valueDropdown, onChangeValueDropdown } = useDropdown(
    eventByCourseSelect?.id,
  )
  const { puntualityInfo, isLoading } = usePuntualityInteractor(valueDropdown!)

  return (
    <View bg="white" flex={1}>
      <ScrollView bg="white" px="1" flex={1}>
        <View height={20} />

        <DropdownComponent
          placeholder="Tipo de evento"
          data={
            convertToDataDropdown(courseSelect?.events, {
              labelKey: 'name',
              valueKey: 'id',
            }) as any
          }
          defaultValue={valueDropdown as any}
          onChange={onChangeValueDropdown}
        />

        <View height={20} />

        <Paragraph color="primary" fontWeight="600">
          Asistencia
        </Paragraph>

        <View height={20} />

        <Paragraph fontWeight="600" color="black" textAlign="center">
          Inasistencias del periodo
        </Paragraph>

        <View height={20} />

        <View>
          <View flexDirection="row" justifyContent="space-between">
            <Paragraph>
              {puntualityInfo?.data.nonAttendancesHoursPercentage}%
            </Paragraph>
            <Paragraph>
              {puntualityInfo?.data.attendancesHoursPercentage}%
            </Paragraph>
            <Paragraph>{puntualityInfo?.data.totalHoursPercentage}%</Paragraph>
          </View>

          <View width="100%" height={10} bg="coolGray-300" borderRadius="full">
            <View
              width={`${
                puntualityInfo?.data?.attendancesHoursPercentage ?? 0
              }%`}
              height={10}
              bg="green-100"
              borderRadius="full">
              <View
                width={`${
                  puntualityInfo?.data?.nonAttendancesHoursPercentage ?? 0
                }%`}
                height={10}
                bg="danger"
                borderRadius="full"
              />
            </View>
          </View>

          <View flexDirection="row" justifyContent="space-between">
            <Paragraph>{puntualityInfo?.data.nonAttendancesHours}h</Paragraph>
            <Paragraph>{puntualityInfo?.data.attendancesHours}h</Paragraph>
            <Paragraph>{puntualityInfo?.data.totalHours}h</Paragraph>
          </View>
        </View>

        <View height={30} />

        {puntualityInfo?.data.nonAttendances.map((item, index) => (
          <View key={index}>
            <View flexDirection="row" alignItems="center">
              <View height={8} width={8} bg="danger" borderRadius="full" />
              <View width={10} />
              <View flex={1}>
                <Paragraph color="black" fontWeight="600">
                  {item.day} {item.date}
                </Paragraph>
                <Paragraph>
                  {item.startAt} - {item.endAt}
                </Paragraph>
              </View>
              <Paragraph>{item.reason}</Paragraph>
            </View>
            <View my="0.5">
              <Separator />
            </View>
          </View>
        ))}
      </ScrollView>
      {isLoading ? <Loading /> : null}
    </View>
  )
}

export default MyPuntualityScreen
