import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors, typography } from '~/ui/theme'
import { Error } from '~/ui/icons'

const ErrorText = ({ error, email = '', style, textStyle }) =>
  error ? (
    <View style={[styles.wrapper, style]}>
      <Error width="16" height="16" />
      <Text style={[styles.error, textStyle]}>
        {email ? error + email : error}
      </Text>
    </View>
  ) : null

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 2,
  },
  error: {
    color: colors.destructive_red,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    flexGrow: 1,
    flexShrink: 1,
  },
})

export default ErrorText
