import View from "../box/View"

const TriangleUp = () => {
  return (
    <View
      width={0}
      height={0}
      borderLeftWidth={50}
      borderRightWidth={50}
      borderBottomWidth={100}
      borderStyle="solid"
      borderLeftColor="coolGray-900"
      style={{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
      }}
    />
  )
}

export default TriangleUp
