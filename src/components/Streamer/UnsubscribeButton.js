import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, text } from '~/ui/theme'

const UnsubscribeButton = () => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.title}>Unubscribe</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    height: 28,
    backgroundColor: '#FF3535',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
})

export default UnsubscribeButton
