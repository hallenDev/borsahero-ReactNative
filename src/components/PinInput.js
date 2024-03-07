import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { ErrorText } from '~/ui'
import { colors, text } from '~/ui/theme'
import noop from '~/utils/noop'

const PinInput = ({ error, onChange = noop }) => {
  const pin1 = useRef()
  const pin2 = useRef()
  const pin3 = useRef()
  const pin4 = useRef()
  const pin5 = useRef()
  const pin6 = useRef()
  const [pincode1, setPincode1] = useState('')
  const [pincode2, setPincode2] = useState('')
  const [pincode3, setPincode3] = useState('')
  const [pincode4, setPincode4] = useState('')
  const [pincode5, setPincode5] = useState('')
  const [pincode6, setPincode6] = useState('')

  useEffect(() => {
    if (pincode1 && pincode2 && pincode3 && pincode4 && pincode5 && pincode6) {
      onChange(pincode1 + pincode2 + pincode3 + pincode4 + pincode5 + pincode6)
    }
  }, [pincode1, pincode2, pincode3, pincode4, pincode5, pincode6])

  const handleKeyDown1 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode1(key)
      pin2.current?.focus()
    } else if (key === 'Backspace') {
      setPincode1('')
    }
  }
  const handleKeyDown2 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode2(key)
      pin3.current?.focus()
    } else if (key === 'Backspace') {
      setPincode2('')
      pin1.current?.focus()
    }
  }
  const handleKeyDown3 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode3(key)
      pin4.current?.focus()
    } else if (key === 'Backspace') {
      setPincode3('')
      pin2.current?.focus()
    }
  }
  const handleKeyDown4 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode4(key)
      pin5.current?.focus()
    } else if (key === 'Backspace') {
      setPincode4('')
      pin3.current?.focus()
    }
  }
  const handleKeyDown5 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode5(key)
      pin6.current?.focus()
    } else if (key === 'Backspace') {
      setPincode5('')
      pin4.current?.focus()
    }
  }
  const handleKeyDown6 = e => {
    const key = e.nativeEvent.key
    if (!isNaN(key) && key.length === 1) {
      setPincode6(key)
      if (pincode1 && pincode2 && pincode3 && pincode4 && pincode5) {
        Keyboard.dismiss()
      }
    } else if (key === 'Backspace') {
      setPincode6('')
      pin5.current?.focus()
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          ref={pin1}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode1}
          onKeyPress={handleKeyDown1}
        />
        <TextInput
          ref={pin2}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode2}
          onKeyPress={handleKeyDown2}
        />
        <TextInput
          ref={pin3}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode3}
          onKeyPress={handleKeyDown3}
        />
        <TextInput
          ref={pin4}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode4}
          onKeyPress={handleKeyDown4}
        />
        <TextInput
          ref={pin5}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode5}
          onKeyPress={handleKeyDown5}
        />
        <TextInput
          ref={pin6}
          style={styles.pinInput(error)}
          keyboardType="number-pad"
          maxLength={1}
          value={pincode6}
          onKeyPress={handleKeyDown6}
        />
      </View>
      <ErrorText error={error} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pinInput: error => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: error ? '#FF3535' : 'rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    color: colors.white,
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
  }),
})

export default PinInput
