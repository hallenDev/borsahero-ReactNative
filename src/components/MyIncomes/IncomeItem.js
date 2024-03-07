import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { colors, text } from '~/ui/theme'
import FreePaidItem from '../FreePaidItem'
import noop from '~/utils/noop'

const IncomeItem = ({ user, onPress = noop }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <FastImage source={{ uri: user.avatar }} style={styles.avatar} />
    <Text style={styles.name} numberOfLines={1}>
      {user.first_name} {user.last_name}
    </Text>

    <FreePaidItem isFree={false} style={styles.ml8} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
    flexGrow: 1,
    flexShrink: 1,
  },
  ml8: {
    marginLeft: 8,
  },
})

export default IncomeItem
