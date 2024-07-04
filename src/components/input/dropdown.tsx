import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { StyleSheet } from 'react-native'

import { Paragraph } from '../typhografic'
import View from '../box/View'

const dataMock = [
  { label: 'Facultad de Odontología', value: '1' },
  { label: 'Biología', value: '2' },
  { label: 'Matemáticas', value: '3' },
  { label: 'Letras', value: '4' },
]

type IDataInput = {
  label: string
  value: string
}

type Props = {
  data?: IDataInput[]
  defaultValue?: IDataInput
  placeholder: string
  onChange?: (item: any) => void
}

const DropdownComponent: React.FC<Props> = ({
  data = dataMock,
  defaultValue = null,
  placeholder = 'Selecciona',
  onChange,
}) => {
  const [isFocus, setIsFocus] = useState(false)

  const renderLabel = () => {
    if (defaultValue || isFocus) {
      return (
        <View position="relative" zIndex={2}>
          <View position="absolute" bottom={-13} left={15} px="0.5" bg="white">
            <Paragraph fontSize={12} color="black">
              {placeholder}
            </Paragraph>
          </View>
        </View>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        value={defaultValue}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${placeholder}` : '...'}
        searchPlaceholder="Search..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          onChange?.(item.value)
          setIsFocus(false)
        }}
      />
    </View>
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 14,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
