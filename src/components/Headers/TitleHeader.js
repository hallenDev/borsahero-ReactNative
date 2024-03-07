import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, text } from '~/ui/theme'
import { Back } from '~/ui/icons'

const TitleHeader = ({ title, RightComponent, onBack }) => (
  <View style={styles.container}>
    {onBack && (
      <TouchableOpacity onPress={onBack}>
        <Back width={24} height={24} />
      </TouchableOpacity>
    )}
    <Text style={styles.title}>{title}</Text>
    {RightComponent}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginLeft: 20,
  },
})

export default TitleHeader
