import { useEffect, useState } from 'react'
import { IconTriangleBottom } from '../../../assets/icons'
import { ScrollView, View } from '../../../components/box'
import Collapse from '../../../components/collapse'
import Loading from '../../../components/loading'
import Separator from '../../../components/separator'
import { Paragraph } from '../../../components/typhografic'
import { MenuHeaderV2 } from '../../../containers'
import { CalificationItem } from '../../Courses/presentation/components'
import useCalificationDetailInteractor from './MyCalificationsDetail.interactor'
import CalificationDetailEntity from '../domain/entity/calificationDetail.entity'
import { useStudyPlan } from '../../../context'

const DATA = [
  {
    header: 'Evaluación de Procesos',
  },
  {
    header: 'Laboratoios',
  },
  {
    header: 'Semiotica',
  },
]

const MyCalificationDetailSreen: React.FC = () => {
  const { courseSelect } = useStudyPlan()
  const { isLoading, fetchCalificationsByCourseId } =
    useCalificationDetailInteractor()
 
  const [califications, setCalifications] = useState<CalificationDetailEntity>()

  const init = async () => {
    if(!courseSelect) return
    const response = await fetchCalificationsByCourseId({
      courseId: courseSelect?.id,
    })
    setCalifications(response?.data)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <ScrollView flex={1} bg="white">
      <MenuHeaderV2 />

      <View height={20} />

      <View px="1">
        <View flexDirection="row" justifyContent="space-between">
          <Paragraph color="primary" fontWeight="600">
            Evaluaciones
          </Paragraph>
          <View flexDirection="row" alignItems="center">
            <View
              height={8}
              width={8}
              bg="toastWarning"
              borderRadius="full"
              mr="0.25"
            />
            <Paragraph>{`Inscrito | ${courseSelect?.credits} Créditos`}</Paragraph>
          </View>
        </View>

        <View height={15} />

        <View
          borderWidth={1}
          borderRadius="lg"
          borderColor="coolGray-900"
          py="0.5"
          px="0.75"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <View>
            <Paragraph fontWeight="600" color="black">
              {califications?.data?.finalAverage?.name}
            </Paragraph>
            <Paragraph fontSize={12}>
              Ponderación {califications?.data?.finalAverage?.weighing}
            </Paragraph>
          </View>
          <Paragraph fontSize={20} fontWeight="600" color="black">
            {califications?.data?.finalAverage?.qualification}
          </Paragraph>
        </View>

        <View height={30} />

        {califications?.data?.partialExams.map((item) => (
          <CalificationItem
            key={item.id}
            title={item.name}
            subTitle={`Ponderación ${item.weighing}`}
            calification={item.qualification}
          />
        ))}

        <View height={20} />
        {califications?.data.partialExams.map((item, index) => {

          // if(item.)

          return (
            <View mb="1" key={item.id}>
              <Collapse.Container>
                <Collapse.Header>
                  <View flexDirection="row" justifyContent="space-between">
                    <Paragraph fontWeight="600" color="black">
                      Evaluación de Procesos
                    </Paragraph>
                    <IconTriangleBottom fill="#BD1714" stroke="#BD1714" />
                  </View>
                </Collapse.Header>
                <Collapse.Body>
                  <View
                    bg="coolGray-100"
                    style={{
                      marginLeft: -16,
                      marginRight: -16,
                      marginBottom: -16,
                    }}>
                    <View pr="1" pl="2">
                      <View height={10} />
                      <CalificationItem
                        title="Procesos 1"
                        subTitle="Ponderación 0.5%"
                        calification="12"
                      />
                      <CalificationItem
                        title="Procesos 1"
                        subTitle="Ponderación 0.5%"
                        calification="12"
                        showSeparator={false}
                      />
                    </View>
                  </View>
                </Collapse.Body>
              </Collapse.Container>
              <View py="1">
                <Separator />
              </View>
            </View>
          )
        })}
      </View>
      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default MyCalificationDetailSreen
