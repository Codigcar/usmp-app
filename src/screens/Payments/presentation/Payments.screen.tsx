import { DrawerActions, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

import { useEffect, useState } from 'react'
import { ScrollView, View } from '../../../components/box'
import DropdownComponent from '../../../components/input/dropdown'
import { HeaderItem } from '../../Events/components'
import { Paragraph } from '../../../components/typhografic'
import {
  IconBell,
  IconThreeLines,
  IconTriangleBottom,
} from '../../../assets/icons'
import Card from '../../../components/card'
import RadioButton from '../../../components/radio/RadioButton'
import Button from '../../../components/button'
import Ribbon from '../../../components/ribbon'
import { convertToDataDropdown } from '../../Courses/infrastructure/utils'
import { useStudyPlan } from '../../../context'
import usePaymentsInteractor from './Payments.interactor'
import moment from 'moment'
import CDateTime from '../../../libraries-implementation/dateTime'

const ITEMS = [
  {
    name: 'Pensiones',
  },
  {
    name: 'Servicios',
  },
]
const PaymentsScreen: React.FC = () => {
  const [tabSelect, setTabSelect] = useState(0)

  const navigation: any = useNavigation()
  const { studyPlanSelect, studyPLanList } = useStudyPlan()
  const {
    payments,
    isLoading,
    listToPay,
    addListToPay,
    init,
    filterByPensions,
    filterByServices,
    isPEN,
    onChangeCurrency,
    resetListToPay,
  } = usePaymentsInteractor()

  useEffect(() => {
    if (!studyPlanSelect) return
    resetListToPay()
    setTabSelect(0)
    init(String(studyPlanSelect.id))
  }, [studyPlanSelect, isPEN])

  return (
    <ScrollView flex={1} bg="white">
      <Ribbon.base
        isLoading={isLoading}
        title="Pago de pensiones"
        RightComponent={() => (
          <View flexDirection="row">
            <TouchableOpacity
              onPress={() => navigation.push('MyCourseNotifications')}>
              <IconBell />
            </TouchableOpacity>
            <View width={10} />
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconThreeLines />
            </TouchableOpacity>
          </View>
        )}
      />

      <View px="1">
        <View height={20} />
        <DropdownComponent
          placeholder="Plan de estudio"
          data={convertToDataDropdown(studyPLanList) as any}
          defaultValue={convertToDataDropdown(studyPlanSelect!) as any}
        />
        <View height={20} />

        <View
          flexDirection="row"
          justifyContent="center"
          height={40}
          width="100%">
          {ITEMS.map((item, index) => (
            <HeaderItem
              isFullWidth
              onPress={() => {
                setTabSelect(index)
                if (item.name === ITEMS[1].name) {
                  filterByServices()
                  return
                }
                filterByPensions()
              }}
              isSelected={tabSelect === index}
              key={item.name}
              title={item.name}
              first={index === 0}
              end={index === ITEMS.length - 1}
            />
          ))}
        </View>
        <View height={20} />

        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Paragraph color="primary" fontWeight="600">
            Recibos pendientes
          </Paragraph>
          <View flexDirection="row" alignItems="center">
            <TouchableOpacity onPress={onChangeCurrency} hitSlop={5}>
              <Paragraph color="primary" fontSize={8} fontWeight="600">
                {isPEN ? 'VER EN DOLARES' : 'VER EN SOLES'}
              </Paragraph>
            </TouchableOpacity>
            <View width={5} />
            <IconTriangleBottom fill="#BD1714" stroke="#BD1714" />
          </View>
        </View>
        <View height={10} />

        {payments?.map((item, index) => {
          return (
            <Card.Shadow key={item?.id}>
              <View flexDirection="row" alignItems="center">
                <View>
                  <RadioButton
                    type="cuadrado"
                    text=""
                    checked={listToPay.includes(item)}
                    onPress={() => {
                      addListToPay(item)
                      // setIsChecked((prev) => !prev)
                    }}
                  />
                </View>
                <View flex={1}>
                  <Paragraph color="black" fontWeight="600">
                    {item?.description}
                  </Paragraph>
                  <Paragraph>Periodo {item?.period}</Paragraph>
                  <View
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <View flexDirection="row" alignItems="center" pl="0.25">
                      {item?.statuses === 'expired' ? (
                        <>
                          <View
                            height={8}
                            width={8}
                            bg="danger"
                            borderRadius="full"
                          />
                          <View width={6} />
                        </>
                      ) : null}
                      <Paragraph fontSize={10}>
                        {item?.statusesName}
                        {
                          CDateTime.getInstance().getMetaDataByDay(
                            moment(item?.expiredAt, 'MM/DD/YYYY HH:mm:ss'),
                          ).DDMMMAAAA
                        }
                      </Paragraph>
                    </View>
                    <View flexDirection="row">
                      <Paragraph color="primary">Total:</Paragraph>
                      <View width={5} />
                      <Paragraph color="black" fontWeight="600">
                        {item?.moneyType} {item?.amount}
                      </Paragraph>
                    </View>
                  </View>
                </View>
              </View>
            </Card.Shadow>
          )
        })}

        {payments?.length ?? 0 > 0 ? (
          <View py="1">
            <Button
              title="Ir a pagar"
              type="primary"
              onPress={() =>
                navigation.push('PaymentDetailScreen', { listToPay })
              }
            />
          </View>
        ) : (
          <Paragraph textAlign="center">No hay pagos pendientes...</Paragraph>
        )}
      </View>
    </ScrollView>
  )
}

export default PaymentsScreen
