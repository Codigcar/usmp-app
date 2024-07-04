import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HomeStackScreenProps } from '../../../routes/types'
import { View } from '../../../components/box'
import Ribbon from '../../../components/ribbon'
import { HeaderItem } from '../../Events/components'
import InfiniteScrollList from '../../../components/infiniteScroll'
import { Paragraph } from '../../../components/typhografic'
import useNewsInteractor from './News.interactor'
import { IconBell, IconThreeLines } from '../../../assets/icons'
import { NewInfoEntity } from '../domain/entities/news.entity'
import NewRenderItem from './components/NewRenderItem'
import { Carousel } from '../../../components/carousel'
import Image from '../../../components/image'
import Card from '../../../components/card'
import { Dimensions } from 'react-native'

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
]

const NewsScreen: React.FC = () => {
  const [hasMore, setHasMore] = useState(false)
  const { isLoading, onChangeTabSelect, tabSelect, newsList } =
    useNewsInteractor()

  const navigation =
    useNavigation<HomeStackScreenProps<'NewsScreen'>['navigation']>()

  const handleLoadMore = async (pageToLoad: number) => {}

  return (
    <View flex={1} bg="white">
      <View flex={1}>
        <Ribbon.base
          title="Noticias"
          isLoading={isLoading}
          RightComponent={() => (
            <View flexDirection="row">
              <IconBell />
              <View width={10} />
              <IconThreeLines />
            </View>
          )}
        />

        <View height={20} />

        <View flexDirection="row" justifyContent="center" height={40}>
          {ITEMS.map((item, index) => (
            <HeaderItem
              isFullWidth
              onPress={() => onChangeTabSelect(index)}
              isSelected={tabSelect === index}
              key={index}
              title={item.name}
              first={index === 0}
              end={index === ITEMS.length - 1}
            />
          ))}
        </View>

        <View height={20} />

        <View flexDirection="row" justifyContent="center" alignItems="center">
          <Carousel
            width={Dimensions.get('window').width - 30}
            height={308}
            data={newsList?.data.featured ?? []}
            renderItem={({ index }) => (
              <Card.Shadow flex={1} padding="0">
                <View flexDirection="column" flex={1} borderRadius="full">
                  <Image
                    source={
                      newsList?.data.featured[index].backgroundImage ??
                      require('../../../assets/images/bg-rol-student.png')
                    }
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
                      {newsList?.data.featured[index].title}
                    </Paragraph>
                    <Paragraph fontSize={13} color="black">
                      {newsList?.data.featured[index].subtitle}
                    </Paragraph>
                    <View height={10} />
                    <View flexDirection="row">
                      <Paragraph fontSize={10}>
                        {newsList?.data.featured[index].summary}
                      </Paragraph>
                    </View>
                    <View height={10} />
                    <Paragraph fontSize={10}>
                      {newsList?.data.featured[index].monthsAgo}
                    </Paragraph>
                  </View>
                </View>
              </Card.Shadow>
            )}
          />
        </View>

        <InfiniteScrollList
          data={newsList?.data.news}
          keyExtractor={({ id }: any) => id}
          hasMore={hasMore && (newsList?.data.news.length ?? 0) < 50}
          loadMore={handleLoadMore}
          renderItem={({ item }: { item: NewInfoEntity }) => (
            <View px="1">
              <NewRenderItem
                image={
                  item.backgroundImage as any ??
                  require('../../../assets/images/bg-rol-student.png')
                }
                title={item.title}
                subTitle={item.summary}
                date={item.monthsAgo}
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
              <Paragraph>Vacio</Paragraph>
            </View>
          }
        />
      </View>
    </View>
  )
}

export default NewsScreen
