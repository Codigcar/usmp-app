import View from "../box/View"

const TriangleRight = () => {
  return (
    <View
      width={0}
      height={0}
      borderBottomWidth={50}
      borderTopWidth={50}
      borderLeftWidth={100}
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

export default TriangleRight
