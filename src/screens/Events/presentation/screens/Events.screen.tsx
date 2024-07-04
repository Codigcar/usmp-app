import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View } from '../../../../components/box'
import { Carousel } from '../../../../components/carousel'
import InfiniteScrollList from '../../../../components/infiniteScroll/InfiniteScroll'
import DropdownComponent from '../../../../components/input/dropdown'
import { Paragraph } from '../../../../components/typhografic'
import { MenuHeaderV2 } from '../../../../containers'
import RenderItem from '../../components/RenderItem'
import { HeaderItem } from '../../components'
import { EventStackScreenProps } from '../../../../routes/types'
import Ribbon from '../../../../components/ribbon'
import useEventsInteractor from './Events.interactor'
import { EventInfoEntity } from '../../../News/domain/entities/events.entity'

const ITEMS = [
  {
    name: 'Todos',
  },
  {
    name: 'Facultad',
  },
  {
    name: 'Escuela',
  },
  {
    name: 'Favoritos',
  },
]

const items = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
]

const EventsScreen: React.FC = () => {
  const [hasMore, setHasMore] = useState(false)
  // const [tabSelect, setTabSelect] = useState(0)
  const { isLoading, onChangeTabSelect, tabSelect, eventsList } =
    useEventsInteractor()
  const navigation =
    useNavigation<EventStackScreenProps<'EventsScreen'>['navigation']>()

  const handleLoadMore = async (pageToLoad: number) => {}

  return (
    <View flex={1} bg="white">
      <View flex={1}>
        <Ribbon.base title="Eventos" />

        <View height={20} />

        <View flexDirection="row" justifyContent="center" height={40}>
          {ITEMS.map((item, index) => (
            <HeaderItem
              onPress={() => onChangeTabSelect(index)}
              isSelected={tabSelect === index}
              key={index}
              title={item.name}
              first={index === 0}
              end={index === ITEMS.length - 1}
            />
          ))}
        </View>

        {/* <InfiniteScrollList
          ListHeaderComponent={() => {
            return (
              <>
                <View px="1">
                  <View height={20} />

                  <DropdownComponent />

                  <View height={20} />
                </View>
              </>
            )
          }}
          data={items}
          keyExtractor={({ id }: any) => id}
          hasMore={hasMore && items.length < 50}
          loadMore={handleLoadMore}
          renderItem={() => (
            <View px="1">
               <RenderItem
                onPress={() => navigation.push('EventDetailScreen')}
              /> 
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View bg="coolGray-300" height={1} mx="1" />
          )}
          ListEmptyComponent={
            <View flex={1} px="0.75">
              <Paragraph>Vacio</Paragraph>
            </View>
          }
        /> */}

      </View>
    </View>
  )
}

export default EventsScreen
