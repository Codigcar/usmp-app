import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import { Paragraph } from '../typhografic'
import { View } from '../box'
import Separator from '../separator'

type IDataInput = {
  label: string
  value: string
}

type Props = {
  data?: IDataInput[]
  defaultValue?: IDataInput
  placeholder: string
  onChange: (item: string[]) => void
  value: string[]
}

const dataMock = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]

const MultiSelectComponent: React.FC<Props> = ({
  data = dataMock,
  defaultValue = null,
  placeholder = 'Selecciona',
  onChange,
  value,
}) => {
  return (
    <View>
      <MultiSelect
        maxSelect={6}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        inputSearchStyle={styles.inputSearchStyle}
        search
        searchPlaceholder="Buscar alumno..."
        // value={selected}
        // onChange={(item) => {
        //   setSelected(item)
        // }}
        value={value}
        onChange={onChange}
        // onChange={onChange}
        // inside
        // inverted={false}
        //   renderLeftIcon={() => (
        //     <Paragraph>hola</Paragraph>
        //   )}
        renderItem={(item: any, selected) => (
          <View>
            <View py="0.5" bg={selected ? 'coolGray-200' : 'white'}>
              <Paragraph fontSize={11}>{item.label}</Paragraph>
            </View>
            <Separator />
          </View>
        )}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View
              my="0.25"
              flexDirection="row"
              borderWidth={1}
              borderColor="gray-900"
              borderRadius="full"
              px="1"
              mr="0.5"
              alignItems="center">
              <Paragraph style={styles.textSelectedStyle} fontWeight="500">
                {item.label}
              </Paragraph>
              <Paragraph color="gray-900" fontWeight="400" fontSize={16}>
                X
              </Paragraph>
            </View>
          </TouchableOpacity>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  )
}

export default MultiSelectComponent

const styles = StyleSheet.create({
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    // borderBottomWidth: 0.5,
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
})
