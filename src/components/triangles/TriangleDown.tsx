import View from '../box/View'

const TriangleDown: React.FC = () => {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 7, // Mitad de la base del triángulo
        borderRightWidth: 7, // Mitad de la base del triángulo
        borderTopWidth: 10, // Altura del triángulo
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'gray', // Color del triángulo
      }}
    />
  )
}

export default TriangleDown
