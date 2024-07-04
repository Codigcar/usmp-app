import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

import {
  IconMyAsistencia,
  IconMyMaterialCurso,
  IconMyNotes,
  IconMyTutorias,
  IconTriangleBottom,
  IconTriangleRight,
} from '../../../../assets/icons'
import { ScrollView, View } from '../../../../components/box'
import { AvatarImage } from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'
import { MyCourseDetailSectionItem, Tutorials } from '../components'
import { convertToDataDropdown } from '../../infrastructure/utils'
import DropdownComponent from '../../../../components/input/dropdown'
import Separator from '../../../../components/separator'
import useMyCourseDetailInteractor from './MyCoursesDetail.interactor'
import Loading from '../../../../components/loading'
import SectionInfo from '../components/MyCoursesDetail.section.component'
import Collapse from '../../../../components/collapse'
import useHomeInteractor from '../../../Home/presentation/screens/Home.interactor'

const MyCousesDetailScreen = () => {
  const {
    getWeekDays,
    isLoading: isLoading1,
    courseSelect,
    daySelect,
    onChangeDaySelect,
    chronogramInfo,
    valueDropdown,
    onChangeValueDropdown,
    eventByCourseSelect,
    summaryInfo,
  } = useMyCourseDetailInteractor()

  const navigation: any = useNavigation()
  const { isLoading: isLoading2 } = useHomeInteractor()
  const isLoading = isLoading1 || isLoading2

  return (
    <ScrollView flex={1} bg="white" position="relative">
      <View px="1">
        <View height={20} />

        <MyCourseDetailSectionItem
          title="Mis notas"
          subTitle="Consulta tus notas del curso"
          onPress={() =>
            navigation.push('CalificationsStackScreen', {
              screen: 'CalificationDetailScreen',
            })
          }
          PrefixComponent={() => (
            <View mr="0.5">
              <IconMyNotes />
            </View>
          )}
          SuffixComponent={() => (
            <View>
              <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
            </View>
          )}
        />

        <View height={17} />

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

        <View height={30} />

        <Paragraph color="black" fontWeight="600">
          Selecciona un día y visualiza tu horario:
        </Paragraph>

        <View height={10} />

        {/* Dias */}
        <ScrollView>
          <View flexDirection="row">
            {getWeekDays.map((item) => {
              const isSelect = daySelect?.date === item.date
              return (
                <TouchableOpacity
                  onPress={() => onChangeDaySelect(item)}
                  key={item.date}>
                  <View
                    mr="0.5"
                    height={40}
                    width={40}
                    bg={isSelect ? 'black' : 'white'}
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={1}
                    borderColor="black">
                    <Paragraph color={isSelect ? 'white' : 'black'}>
                      {item.name}
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>

        {/* info según el dia */}

        {chronogramInfo?.data?.length! > 0 ? (
          <>
            <View height={20} />

            <Collapse.Container>
              <Collapse.Header>
                <View flexDirection="row" justifyContent="space-between" pb="1">
                  <SectionInfo
                    title="Horario:"
                    body={`${chronogramInfo?.data[0].startTime} - ${chronogramInfo?.data[0].endTime}`}
                  />

                  <View flexDirection="row" alignItems="center">
                    <Paragraph fontSize={8} fontWeight="600">
                      MÁS DETALLE
                    </Paragraph>
                    <View width={5} />
                    <IconTriangleBottom fill="#BD1714" stroke="#BD1714" />
                  </View>
                </View>
              </Collapse.Header>
              <Collapse.Body>
                <>
                  <View flexDirection="row" justifyContent="space-between">
                    <SectionInfo
                      title="Sección/ Turno"
                      body={chronogramInfo?.data[0]?.section ?? ''}
                    />

                    <SectionInfo
                      title="Créditos"
                      body={courseSelect?.credits!}
                      textAlign="center"
                    />

                    <SectionInfo
                      title="Modalidad"
                      body={eventByCourseSelect?.modality!}
                      textAlign="center"
                    />
                  </View>

                  <View height={15} />

                  <SectionInfo
                    title="Campus"
                    body={chronogramInfo?.data[0]?.classroom ?? ''}
                  />
                </>
              </Collapse.Body>
            </Collapse.Container>

            <View height={10} />
            <Separator />
            <View height={25} />
            <AvatarImage
              title="Maestro"
              body={chronogramInfo?.data[0]?.professor?.name}
              footer={chronogramInfo?.data[0]?.professor?.name}
              imageURL={chronogramInfo?.data[0]?.professor?.imageUrl!}
            />
          </>
        ) : null}

        <View height={30} />

        <MyCourseDetailSectionItem
          title="Tutorías"
          subTitle={`${summaryInfo?.data.tutoringCount} horarios disponibles`}
          PrefixComponent={() => (
            <View mr="0.5">
              <IconMyTutorias />
            </View>
          )}>
          <Paragraph fontWeight="600" color="black">
            Horarios de tutoría:
          </Paragraph>
          <View height={10} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} mb="1">
            <View flexDirection="row">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <View key={index} flexDirection="row">
                  {index !== 0 ? (
                    <View
                      width={1}
                      height="100%"
                      bg="trueGray-100"
                      ml="1"
                      mr="0.5"
                    />
                  ) : null}
                  <Tutorials />
                </View>
              ))}
            </View>
          </ScrollView>
        </MyCourseDetailSectionItem>

        <MyCourseDetailSectionItem
          title="Material del curso"
          subTitle={`${summaryInfo?.data.materialCount} archivos`}
          onPress={() => navigation.push('MyCourseMaterialScreen')}
          PrefixComponent={() => (
            <View mr="0.5">
              <IconMyMaterialCurso />
            </View>
          )}
          SuffixComponent={() => (
            <View>
              <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
            </View>
          )}
        />

        <MyCourseDetailSectionItem
          title="Asistencia"
          subTitle={`${summaryInfo?.data.nonAssistenceCount} inasistencias totales`}
          onPress={() => navigation.push('MyPuntualityScreen')}
          PrefixComponent={() => (
            <View mr="0.5">
              <IconMyAsistencia />
            </View>
          )}
          SuffixComponent={() => (
            <View>
              <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
            </View>
          )}
        />

        <MyCourseDetailSectionItem
          title="Alumnos"
          subTitle="Alumnos..."
          onPress={() => navigation.push('MyStudentsScreen')}
          PrefixComponent={() => (
            <View mr="0.5">
              <IconMyAsistencia />
            </View>
          )}
          SuffixComponent={() => (
            <View>
              <IconTriangleRight fill="#9F9D9B" stroke="#9F9D9B" />
            </View>
          )}
        />
      </View>

      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default MyCousesDetailScreen
