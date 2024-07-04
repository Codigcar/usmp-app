import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Card from '../../../../components/card'
import Separator from '../../../../components/separator'
import Ribbon from '../../../../components/ribbon'
import { View } from '../../../../components/box'
import { Paragraph } from '../../../../components/typhografic'
import { HeaderAvatar } from '../components'
import useMyProfileInteractor from './MyProfile.interactor'
import {
  IconCloseFullBg,
  IconPadLock,
  IconPencil,
  IconTriangleRight,
} from '../../../../assets/icons'

const MyProfileScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const { isLoading, myProfileInfo } = useMyProfileInteractor()

  return (
    <View flex={1} bg="white">
      <Ribbon.base
        title="Mi Perfil"
        isLoading={isLoading}
        RightComponent={() => (
          <TouchableOpacity
            onPress={() => {
              navigation.push('ProfileStackScreen', {
                screen: 'MyProfileEditScreen',
                params: {
                  profileEntity: myProfileInfo,
                },
              })
            }}>
            <IconPencil />
          </TouchableOpacity>
        )}
      />

      <View height={20} />

      <View px="1">
        <HeaderAvatar />

        <View height={30} />

        <Paragraph fontSize={10}>Correo personal</Paragraph>

        <TouchableOpacity
          onPress={() => {
            navigation.push('ProfileStackScreen', {
              screen: 'MyProfileEditScreen',
            })
          }}>
          {myProfileInfo?.data.personalEmail ? (
            <Paragraph>{myProfileInfo?.data.personalEmail}</Paragraph>
          ) : (
            <View flexDirection="row" alignItems="center">
              <IconCloseFullBg />
              <View width={3} />
              <Paragraph color="primary" fontSize={10}>
                Falta agregar
              </Paragraph>
            </View>
          )}
        </TouchableOpacity>

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontSize={10}>Celular</Paragraph>

        {myProfileInfo?.data.phone ? (
          <Paragraph>{myProfileInfo?.data.phone}</Paragraph>
        ) : (
          <View flexDirection="row" alignItems="center">
            <IconCloseFullBg />
            <View width={3} />
            <Paragraph color="primary" fontSize={10}>
              Falta agregar
            </Paragraph>
          </View>
        )}

        <View py="1">
          <Separator />
        </View>

        <Paragraph fontSize={10}>Dirección</Paragraph>
        <Paragraph color="black">{myProfileInfo?.data.address}</Paragraph>

        <View height={30} />

        <TouchableWithoutFeedback
          onPress={() =>
            navigation.push('ProfileStackScreen', {
              screen: 'VerificationScreen',
            })
          }>
          <Card.Shadow>
            <View flexDirection="row" alignItems="center" height={35}>
              <IconPadLock />
              <View width={10} />
              <View flex={1}>
                <Paragraph color="primary" fontWeight="600">
                  Modifica tu clave
                </Paragraph>
              </View>
              <IconTriangleRight
                fill="#9F9D9B"
                stroke="#9F9D9B"
                width={10}
                height={10}
              />
            </View>
          </Card.Shadow>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default MyProfileScreen
