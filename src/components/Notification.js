import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors, text } from '~/ui/theme'

const Notification = ({ data: { title, message, error = false } }) => (
  <View style={styles.container(error)}>
    <Text style={styles.title}>{title}</Text>
    {message && <Text style={styles.message}>{message}</Text>}
  </View>
)

const styles = StyleSheet.create({
  container: error => ({
    backgroundColor: '#141414',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: error ? 'rgba(255, 53, 53, 0.4)' : 'rgba(110, 58, 255, 0.4)',
    padding: 12,
    marginBottom: 10,
  }),
  title: {
    fontFamily: text.bold.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  message: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginTop: 3,
  },
})

export default Notification
