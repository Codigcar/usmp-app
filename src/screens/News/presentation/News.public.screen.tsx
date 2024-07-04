import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from '../../../components/box'
import { MenuHeaderV2 } from '../../../containers'
import { HeaderItem, RenderItem } from '../../Events/components'
import DropdownComponent from '../../../components/input/dropdown'
import { Carousel } from '../../../components/carousel'
import InfiniteScrollList from '../../../components/infiniteScroll/InfiniteScroll'
import { Paragraph } from '../../../components/typhografic'
import useNewsInteractor from './News.interactor'
import Ribbon from '../../../components/ribbon'
import { IconBell, IconThreeLines } from '../../../assets/icons'
import { NewInfoEntity } from '../domain/entities/news.entity'
import CDateTime from '../../../libraries-implementation/dateTime'
import moment from 'moment'
import { TouchableOpacity } from 'react-native'
import Image from '../../../components/image'

const ITEMS = [
  {
    name: 'Noticias',
  },
  {
    name: 'Eventos',
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

const NewsPublicScreen: React.FC = () => {
  const [hasMore, setHasMore] = useState(false)

  const navigation: any = useNavigation()
  const { isLoading, newsList, tabSelect, onChangeTabSelect } =
  useNewsInteractor()

  const handleLoadMore = async (pageToLoad: number) => {}

  return (
    <View flex={1} bg="white">
      {/* <Paragraph>{JSON.stringify(newsList)}</Paragraph>
      <Paragraph>{JSON.stringify(isLoading)}</Paragraph> */}
      <View flex={1}>
        <Ribbon.base
          isLoading={isLoading}
          title="Noticias"
          RightComponent={() => (
            <View flexDirection="row">
              <TouchableOpacity
                onPress={() => navigation.push('MyCourseNotifications')}>
                <IconBell />
              </TouchableOpacity>
              <View width={10} />
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <IconThreeLines />
              </TouchableOpacity>
            </View>
          )}
        />

        <View height={20} />

        <View flexDirection="row" justifyContent="center" height={40}>
          {ITEMS.map((item, index) => (
            <HeaderItem
              isFullWidth
              onPress={() => {
                console.log('🚀 --------------------------------------------🚀')
                console.log('🚀 ~ file: News.screen.tsx:75 ~ index:', index)
                console.log('🚀 --------------------------------------------🚀')
                onChangeTabSelect(index)
              }}
              isSelected={tabSelect === index}
              key={index}
              title={item.name}
              first={index === 0}
              end={index === ITEMS.length - 1}
            />
          ))}
        </View>

        {/* <Carousel
            width={350}
            height={600}
            data={newsList?.data.featured ?? []}
            renderItem={({ index }) => (
              <View flex={1} padding="0" bg="white" borderRadius="xxl">
                <View flexDirection="column" flex={1} borderRadius="full">
                  <Image
                    source={require('../../../../assets/images/bg-rol-student.png')}
                    resizeMode="cover"
                    style={{
                      height: 80,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                  <View flex={1} px="1">
                    <View height={10} />
                    <Paragraph fontWeight="600" color="black">
                      {newList?.data[index].title}
                    </Paragraph>
                    <Paragraph fontSize={13} color="black">
                      {popupsList?.data[index].subtitle}
                    </Paragraph>
                    <View height={10} />
                    <Paragraph>{popupsList?.data[index].summary}</Paragraph>
                   
                  </View>
                </View>
                <View width="90%" pl="1" pb="2">
                  <Button title="Ver más" onPress={() => {
                    setShowPopup(false)
                    navigation.push('NewsScreen')
                  }} type="primary" />
                </View>
              </View>
            )}
          /> */}

        {newsList?.data ? (
          <InfiniteScrollList
            ListHeaderComponent={() => {
              return (
                <>
                  <View px="1">
                    <View height={20} />

                    {/* <DropdownComponent /> */}

                    <View height={20} />
                    {/* <Carousel /> */}
                    <View height={20} />
                  </View>
                </>
              )
            }}
            data={newsList?.data.news}
            keyExtractor={({ id }: any) => id}
            hasMore={hasMore && items.length < 50}
            loadMore={handleLoadMore}
            renderItem={({ item }: { item: NewInfoEntity }) => (
              <View px="1">
                <RenderItem
                  title={item.title}
                  subTitle={item.subtitle}
                  ubication="XXX"
                  date={
                    CDateTime.getInstance().getMetaDataByDay(
                      moment(item.startAt).locale('es'),
                    ).DDMMMAAAA
                  }
                  onPress={() =>
                    navigation.push('NewDetailScreen', { newInfo: item })
                  }
                />
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View bg="coolGray-300" height={1} mx="1" />
            )}
            ListEmptyComponent={
              <View flex={1} px="0.75">
                <Paragraph>No se encontró información...</Paragraph>
              </View>
            }
          />
        ) : null}
      </View>
    </View>
  )
}

export default NewsPublicScreen
