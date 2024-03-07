import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { colors, text, typography } from '~/ui/theme'
import noop from '~/utils/noop'

const ViewAllHeader = ({ title, actionTitle, onPress = noop }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    {actionTitle && (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{actionTitle}</Text>
      </TouchableOpacity>
    )}
  </View>
)

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 22,
    color: colors.white,
    flexShrink: 1,
  },
  buttonText: {
    ...typography.p1,
    fontSize: 16,
    color: '#85FF3A',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(133, 255, 58, 0.1)',
    borderRadius: 20,
  },
})

export default ViewAllHeader
