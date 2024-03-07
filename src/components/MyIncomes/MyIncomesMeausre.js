import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, text } from '~/ui/theme'

const MyIncomesMeausre = ({ title, value, Icon }) => (
  <View style={styles.container}>
    <Icon width={42} height={42} style={styles.icon} />

    <View>
      <Text style={styles.number}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 100,
    padding: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  number: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
})

export default MyIncomesMeausre
