import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '~/ui/theme'

const TabBarIcon = ({ Icon, focused, color }) => (
  <View style={[styles.container, focused && styles.focused]}>
    <Icon width={24} height={24} fill="none" color={color} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: colors.surface_primary,
    borderTopWidth: 2,
  },
  focused: {
    borderTopColor: colors.button_primary,
    borderTopWidth: 2,
  },
})

export default TabBarIcon
