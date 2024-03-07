import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { typography } from '~/ui/theme'

const FreePaidItem = ({ isFree = true, style }) =>
  isFree ? (
    <Text style={[styles.free, style]}>FREE</Text>
  ) : (
    <Text style={[styles.paid, style]}>PAID</Text>
  )

const styles = StyleSheet.create({
  free: {
    ...typography.p1,
    fontSize: 12,
    lineHeight: 18,
    color: '#85FF3A',
    borderWidth: 1,
    borderColor: '#85FF3A',
    borderRadius: 10,
    paddingHorizontal: 5,

    height: 20,
  },
  paid: {
    ...typography.p1,
    fontSize: 12,
    lineHeight: 18,
    color: '#FF3535',
    borderWidth: 1,
    borderColor: '#FF3535',
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 20,
  },
})

export default FreePaidItem
