import React, { useRef, useEffect } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors } from '~/ui/theme'

const InputCodeField = ({
  index,
  select = false,
  value,
  error,
  onFocus,
  onChange,
  onKeyDown,
}) => {
  const inputRef = useRef()

  useEffect(() => {
    if (select) inputRef.current.focus()
  }, [select])

  return (
    <View>
      <TextInput
        ref={inputRef}
        style={[styles.code(select), error != '' && styles.error]}
        value={value}
        onFocus={() => onFocus(index)}
        onKeyPress={({ nativeEvent }) => {
          onKeyDown(nativeEvent.key, index)
        }}
        onChangeText={v => onChange(v, index)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  code: selected => ({
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: selected ? '#121212' : '#222222',
    borderColor: selected ? '#946EFF' : '#FFFFFF1A',
    borderWidth: 1,
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  }),
  error: {
    borderColor: colors.border_destructive,
  },
})

export default InputCodeField
