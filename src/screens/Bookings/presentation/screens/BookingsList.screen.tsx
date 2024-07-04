import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import { View } from '../../../../components/box'
import InfiniteScrollList from '../../../../components/infiniteScroll/InfiniteScroll'
import { Paragraph } from '../../../../components/typhografic'
import { BookingEmpty, BookingListItem } from '../components'
import Button from '../../../../components/button'
import useBookingsListInteractor from './BookingsList.interactor'
import Ribbon from '../../../../components/ribbon'
import CDateTime from '../../../../libraries-implementation/dateTime'

const items = [
  {
    id: '1',
  },
  {
    id: '2',
  },
]

const BookingsListScreen: React.FC = () => {
  const [hasMore, setHasMore] = useState(false)
  const navigation: any = useNavigation()

  const { isLoading, getReservationsList } = useBookingsListInteractor()

  const handleLoadMore = async (page: number) => {}

  return (
    <View flex={1} bg="white">
      <Ribbon.base title="Biblioteca" isLoading={isLoading} />
      <View flex={1}>
        <InfiniteScrollList
          data={getReservationsList?.data ?? []}
          keyExtractor={({ id }) => String(id)}
          hasMore={hasMore && items.length < 50}
          loadMore={handleLoadMore}
          renderItem={({ item }) => (
            <TouchableOpacity
              disabled={item.status === 'Cancelado'}
              onPress={() => {
                navigation.push('BookingDetailScreen', {
                  detail: item,
                })
              }}>
              <BookingListItem
                date={
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(item.cubicleSchedule.startAt).locale('es'),
                  ).DDMMM
                }
                hours={`${
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(item.cubicleSchedule.startAt).locale('es'),
                  ).hora
                } - ${
                  CDateTime.getInstance().getMetaDataByDay(
                    moment(item.cubicleSchedule.endAt).locale('es'),
                  ).hora
                }`}
                sede="X"
                status={item.status}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={BookingEmpty}
          ListHeaderComponent={() => (
            <View px="1" py="1">
              <Paragraph color="primary" fontWeight="600">
                Mis próximas reservas
              </Paragraph>
            </View>
          )}
        />
      </View>
      <View p="1">
        <Button
          title="Crear nueva"
          onPress={() =>
            navigation.push('BookingsStackScreen', {
              screen: 'BookingCreateScreen',
            })
          }
          type="primary"
        />
      </View>
    </View>
  )
}

export default BookingsListScreen
