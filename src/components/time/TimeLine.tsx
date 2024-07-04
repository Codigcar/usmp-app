import View from '../box/View'
import Paragraph from '../typhografic/Paragraph'
import CardTime from './CardTime'
import TimeLineItem from './TimeLineItem'

const TimeLine = () => {
  return (
    <View>
      <TimeLineItem status="finished" />
      <TimeLineItem status="inprocess" />
      <TimeLineItem status="pending" />
    </View>
  )
}

export default TimeLine
