import { StyleSheet, TextInput } from 'react-native'
import View from '../box/View'
import { Paragraph } from '../typhografic'
import { useState } from 'react'

const InputOTP2 = ({
  refInput,
  onBlur,
  onChangeText,
  value,
  errors,
  name,
}: any) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
  }

  const onChangeValue = (text: string) => {
    let limitedText = text
    if (text.length > 1) {
      limitedText = text.slice(1, 2)
    }
    onChangeText(limitedText)
  }

  return (
    <>
      <View
        borderColor={
          errors?.[name] ? 'danger' : isFocused ? 'black' : 'gray-900'
        }
        borderRadius="xxl"
        borderWidth={1}
        width={70}
        height={64}
        justifyContent="center"
        paddingBottom="s">
        <View alignItems="center" flexDirection="row" paddingRight="l">
          <TextInput
            ref={refInput}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeValue}
            value={value}
            textAlignVertical="center"
          />
        </View>
      </View>
      {errors?.[name] ? (
        <View flexDirection="row" alignItems="center">
          <View width={10} />
          {/* <IconValidError /> */}
          <View width={10} />
          <Paragraph color="danger">{errors[name].message}</Paragraph>
        </View>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    color: 'black',
    backgroundColor: 'white',
    fontSize: 12,
    lineHeight: 35,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 50,
    marginTop: 10,
    paddingLeft: 25,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: 'red',
  },
})
export default InputOTP2
