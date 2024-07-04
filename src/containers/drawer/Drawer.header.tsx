import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

import { View } from '../../components/box'
import { AvatarImage } from '../../components/image'
import { TouchableOpacity } from 'react-native'
import { Paragraph } from '../../components/typhografic'
import {
  IconLogoUSMPWhite,
  IconPlay,
  IconScan,
  IconSombrero,
  IconTriangleBottom,
} from '../../assets/icons'

type Props = {
  navigation: DrawerNavigationHelpers
  isAuthenticated: boolean
  fullName: string
  imageUrl: string
  numMatricula: string
}

const DrawerHeader: React.FC<Props> = ({
  navigation,
  isAuthenticated,
  fullName,
  imageUrl,
  numMatricula,
}) => {
  if (!isAuthenticated) {
    return (
      <View
        bg="trueGray-900"
        px="1"
        py="2"
        borderBottomEndRadius="xl"
        borderBottomLeftRadius="xl">
        <IconLogoUSMPWhite />
        <View height={40} />

        <View flexDirection="row" alignItems="center">
          <Paragraph fontSize={16} fontWeight="600" color="white">
            Acceso para estudiantes
          </Paragraph>
        </View>
        <View height={20} />

        <TouchableOpacity
          onPress={() => {
            if (isAuthenticated) navigation.navigate('CarnetScreen')
            if (!isAuthenticated) navigation.navigate('AuthStackScreen')
            navigation.closeDrawer()
          }}>
          <View
            bg="primary"
            width={121}
            height={40}
            borderRadius="full"
            flexDirection="row"
            py="0.5"
            justifyContent="center"
            alignItems="center">
            <IconSombrero />
            <View width={8} />
            <Paragraph color="white" fontWeight="700" fontSize={11}>
              INGRESAR
            </Paragraph>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View
      bg="trueGray-900"
      px="1"
      py="2"
      borderBottomEndRadius="xl"
      borderBottomLeftRadius="xl">
      <View flexDirection="row" alignItems="center">
        <View>
          <AvatarImage imageURL={imageUrl} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileStackScreen')
            navigation.closeDrawer()
          }}>
          <View flexDirection="row" alignItems="center">
            <Paragraph color="white" fontSize={8}>
              VER PERFIL
            </Paragraph>
            <View width={8} />
            <IconPlay />
          </View>
        </TouchableOpacity>
      </View>
      <View height={15} />
      <Paragraph fontSize={16} fontWeight="600" color="white">
        {fullName}
      </Paragraph>
      <Paragraph color="white">Num. de Matrículo: {numMatricula}</Paragraph>

      <View height={15} />
      <View flexDirection="row" alignItems="center">
        <Paragraph fontSize={16} fontWeight="600" color="white">
          Facultad de Odontología{'    '}
        </Paragraph>
        <IconTriangleBottom fill="#fff" stroke="#fff" />
      </View>
      <Paragraph color="white" fontSize={10}>
        Año académico 2023 | 1er Semestre
      </Paragraph>

      <View height={20} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CarnetScreen')
          navigation.closeDrawer()
        }}>
        <View
          bg="primary"
          width={121}
          height={40}
          borderRadius="full"
          flexDirection="row"
          py="0.5"
          justifyContent="center"
          alignItems="center">
          <IconScan />
          <View width={8} />
          <Paragraph color="white" fontWeight="700" fontSize={11}>
            CARNET
          </Paragraph>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DrawerHeader
