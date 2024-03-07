import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'

const PasswordInfo = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Password</Text>
    <Text style={styles.password}>*********</Text>
    <Button type="primary">Change password</Button>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#222222',
    marginTop: 20,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  password: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginTop: 3,
    marginBottom: 30,
  },
})

export default PasswordInfo
