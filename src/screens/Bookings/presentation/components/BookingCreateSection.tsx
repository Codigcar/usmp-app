import { FlatList, TouchableOpacity } from 'react-native'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { CubiclesEntityData } from '../../domain/entities/cubicles.entity'

type Props = {
  title: string
  subTitle: string
  children: JSX.Element
}

const BookingCreateSection: React.FC<Props> = ({
  title,
  subTitle,
  children
}) => {
  return (
    <View>
      <View px="1">
        <Paragraph fontWeight="600" color="black" fontSize={16}>
          {title}
        </Paragraph>
        <Paragraph>{subTitle}</Paragraph>
      </View>
      <View height={10} />
      {/* <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => {
          const isSelect = 
          return (
            <TouchableOpacity onPress={onPress}>
              <View
                bg={isSelect ? 'black' : 'white'}
                height={40}
                width={40}
                borderRadius="full"
                borderWidth={1}
                justifyContent="center"
                alignItems="center">
                <Paragraph color={isSelect ? 'white' : 'black'}>
                  {item.id}
                </Paragraph>
              </View>
            </TouchableOpacity>
          )
        }}
        ItemSeparatorComponent={() => <View width={10} />}
      /> */}
      {children}
    </View>
  )
}
export default BookingCreateSection
