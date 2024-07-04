import { TouchableOpacity } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'

import { IconCopy } from '../../../../assets/icons'
import { ScrollView, View } from '../../../../components/box'
import { AvatarImage } from '../../../../components/image'
import DropdownComponent from '../../../../components/input/dropdown'
import Loading from '../../../../components/loading'
import Separator from '../../../../components/separator'
import { Paragraph } from '../../../../components/typhografic'
import { useStudyPlan } from '../../../../context'
import useDropdown from '../../../../hooks/useDropdown'
import { convertToDataDropdown } from '../../infrastructure/utils'
import useCourseStudentsInteractor from './MyStudents.interactor'

const MyStudentsScreen: React.FC = () => {
  const { courseSelect, eventByCourseSelect } = useStudyPlan()
  const { valueDropdown, onChangeValueDropdown } = useDropdown(
    eventByCourseSelect?.id,
  )
  const { isLoading, studentList } = useCourseStudentsInteractor({
    eventId: valueDropdown!,
  })

  return (
    <View flex={1} bg="white">
      <ScrollView px="1">
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
          Alumnos
        </Paragraph>

        {studentList?.data.map((item, index) => (
          <View key={item.id}>
            <AvatarImage
              imageURL={item.imageUrl}
              title={item.name}
              body={item.email}
              SuffixComponent={() => (
                <TouchableOpacity
                  hitSlop={5}
                  onPress={() => {
                    Clipboard.setString(item.email)
                  }}>
                  <IconCopy />
                </TouchableOpacity>
              )}
            />
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
export default MyStudentsScreen
