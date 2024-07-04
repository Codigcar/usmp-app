import { IconCheckWhite } from '../../assets/icons'
import { CalendarEntityData } from '../../screens/Calendar/domain/entities/calendar.entity'
import View from '../box/View'
import { Paragraph } from '../typhografic'

const CirclePending: React.FC = () => (
  <View
    justifyContent="center"
    alignItems="center"
    width={22}
    height={22}
    borderRadius="full"
    borderColor="gray-900"
    borderWidth={1.5}
  />
)

const CircleInProcess: React.FC = () => (
  <View
    justifyContent="center"
    alignItems="center"
    width={22}
    height={22}
    borderRadius="full"
    borderColor="toastSuccess"
    borderWidth={1.5}>
    <View width={7} height={7} bg="toastSuccess" borderRadius="full"></View>
  </View>
)

const CircleFinished: React.FC = () => (
  <View
    justifyContent="center"
    alignItems="center"
    width={22}
    height={22}
    backgroundColor="black"
    borderRadius="full">
    <IconCheckWhite />
  </View>
)

type Props = {
  status: string
  disableLineTop?: boolean
  disableLineBottom?: boolean
  isOneItem?: boolean
  item: CalendarEntityData
}

const TimeLineItem: React.FC<Props> = ({
  status,
  disableLineTop = false,
  disableLineBottom = false,
  isOneItem = false,
  item,
}) => {
  const getCircleByStatus = () => {
    if (status === 'inprocess') return <CircleInProcess />
    if (status === 'finished') return <CircleFinished />
    return <CirclePending />
  }

  return (
    <View px="1">
      <View flexDirection="row">
        <View
          position="relative"
          alignItems="center"
          justifyContent="center"
          pr="0.75">
          <View
            flex={1}
            width={disableLineTop ? 0 : 2}
            backgroundColor="gray-900"
          />
          {getCircleByStatus()}
          <View
            flex={1}
            width={disableLineBottom ? 0 : 2}
            backgroundColor={isOneItem ? 'white' : 'gray-900'}
          />
        </View>
        {/* CardTime */}
        <View
          bg="white"
          mb="1"
          flex={1}
          borderRadius="xl"
          padding="0.75"
          shadowColor="black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.32}
          shadowRadius={5.46}
          elevation={9}>
          <View flexDirection="row" justifyContent="space-between">
            <Paragraph fontWeight="600" color="black">
              {item?.time}
            </Paragraph>
            <View flexDirection="row">
              <Paragraph>{item?.classroom}</Paragraph>
              <Paragraph> | </Paragraph>
              <Paragraph>Sección {item?.section}</Paragraph>
            </View>
          </View>
          <Paragraph color="black">{item?.name}</Paragraph>
          <Paragraph fontSize={12}>{item?.description}</Paragraph>
        </View>
      </View>
    </View>
  )
}
export default TimeLineItem
