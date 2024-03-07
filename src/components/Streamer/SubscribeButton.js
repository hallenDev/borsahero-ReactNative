import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, text } from '~/ui/theme'
import noop from '~/utils/noop'

const SubscribeButton = ({ onPress = noop }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.title}>Subscribe</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    height: 28,
    backgroundColor: '#6E3AFF',
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

export default SubscribeButton
