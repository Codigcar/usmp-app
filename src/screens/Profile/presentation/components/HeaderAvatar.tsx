import { View } from '../../../../components/box'
import { AvatarImage } from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'
import { useAuth } from '../../../../context'

const HeaderAvatar: React.FC = () => {
  const { user } = useAuth()
  
  return (
    <View>
      <View flexDirection="row" alignItems="center">
        <View>
          <AvatarImage
            size={78}
            imageURL={user?.imageUrl ?? ''}
          />
        </View>
        <View>
          <Paragraph fontWeight="600" color="black" fontSize={16}>
            {user?.name} {user?.lastName}
          </Paragraph>
          <Paragraph>Nro. de Matrícula: {user?.code}</Paragraph>
          <Paragraph>{user?.email}</Paragraph>
        </View>
      </View>

      <View height={20} />

      <Paragraph color="primary" fontWeight="600" fontSize={16}>
        Datos personales
      </Paragraph>
      <Paragraph fontWeight="500">
        Mantén siempre tus datos actualizados
      </Paragraph>
    </View>
  )
}

export default HeaderAvatar
