import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import {
  IconBell,
  IconScan,
  IconShield,
  IconSombrero,
  IconThreeLines,
  IconTriangleBottom,
  IconTriangleTop,
} from '../assets/icons'
import View from '../components/box/View'
import { Paragraph } from '../components/typhografic'
import { useNavigation } from '@react-navigation/native'
import Collapse from '../components/collapse'
import { useEffect, useRef, useState } from 'react'
import useHomeInteractor from '../screens/Home/presentation/screens/Home.interactor'
import { IStudyPlan } from '../screens/Home/domain/dtos/listStudyPlan.response'
import Separator from '../components/separator'
import { IUseImperative } from '../components/collapse/Collapse'
import Loading from '../components/loading'
import { useAuth } from '../context/auth.provider'
import useMenuInteractor from './MenuHeader.interactor'
import { SafeAreaView } from '../components/box'
import { useStudyPlan } from '../context'

const getIconTriangle = (isOpen: boolean) => {
  if (isOpen) return <IconTriangleTop fill="#fff" stroke="#fff" />
  return <IconTriangleBottom fill="#fff" stroke="#fff" />
}

const MenuHeaderV2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    studyPlanSelect,
    onChangeStudyPlanSelect,
    studyPLanList,
    setListStudyPlans,
  } = useStudyPlan()

  const { isAuthenticated } = useAuth()
  const navigation: any = useNavigation()
  const collapseRef = useRef<IUseImperative>(null)
  const { fetchListStudyPlan, isLoading } = useMenuInteractor()

  useEffect(() => {
    if (!isAuthenticated) return
    if (studyPlanSelect) return

    fetchListStudyPlan()
      .then((response) => {
        const listStudyPlan = response.data ?? []
        if (listStudyPlan.length === 0) return
        setListStudyPlans(listStudyPlan)
        onChangeStudyPlanSelect(listStudyPlan[0])
      })
      .catch(() => console.error('error fetchListStudyPlan'))
  }, [])

  const onPressItem = (itemSelect: IStudyPlan) => {
    onChangeStudyPlanSelect(itemSelect)
    setIsOpen(!isOpen)
    collapseRef.current?.closeCollapse()
  }

  return (
    <>
      <SafeAreaView edges={['top']} bg="primary" />

      <View
        bg="primary"
        borderBottomEndRadius="xxl"
        borderBottomStartRadius="xxl"
        px="1.25"
        pt="1.25">
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View>
            <IconShield />
          </View>
          <View flexDirection="row" alignItems="center">
            {isAuthenticated ? (
              <TouchableOpacity onPress={() => navigation.push('CarnetScreen')}>
                <IconScan />
              </TouchableOpacity>
            ) : (
              <IconSombrero />
            )}
            <View width={10} />
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.push('CoursessStackScreen', {
                  screen: 'MyCourseNotifications',
                })
              }>
              <View>
                <IconBell />
              </View>
            </TouchableWithoutFeedback>
            <View width={10} />
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IconThreeLines />
            </TouchableOpacity>
          </View>
        </View>
        <View flex={1} pt="0.5" />
        {isAuthenticated ? (
          <Collapse.Container
            ref={collapseRef}
            onPressHeader={() => {
              setIsOpen(!isOpen)
            }}>
            <Collapse.Header>
              <View flexDirection="row" alignItems="center">
                <Paragraph color="white" fontWeight="600" fontSize={16}>
                  {studyPlanSelect?.name}
                  {'   '}
                </Paragraph>
                {getIconTriangle(isOpen)}
              </View>
            </Collapse.Header>
            <Collapse.Body>
              <View pt="0.75">
                {studyPLanList.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressItem(item)
                        }}>
                        <View
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between">
                          <Paragraph color="white" fontSize={14}>
                            {item.name}
                          </Paragraph>
                          {item.id === studyPlanSelect?.id ? (
                            <View
                              height={8}
                              width={8}
                              bg="white"
                              borderRadius="full"
                            />
                          ) : null}
                        </View>
                        {studyPLanList.length - 1 === index ? null : (
                          <View py="0.25">
                            <Separator />
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </Collapse.Body>
          </Collapse.Container>
        ) : null}
        <View height={15} />
        {isLoading ? <Loading /> : null}
      </View>
    </>
  )
}
export default MenuHeaderV2
