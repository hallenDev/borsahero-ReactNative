import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, text } from '~/ui/theme'
import { GoLive } from '~/ui/icons'

const GoLiveButton = () => (
  <TouchableOpacity style={styles.elem}>
    <View style={styles.container}>
      <View style={styles.inner}>
        <GoLive width={16} height={16} />
        <Text style={styles.text}>Go Live</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  elem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderRadius: 100,
    backgroundColor: 'rgba(110, 58, 255, 0.4)',
    padding: 3,
    marginRight: 10,
  },
  inner: {
    width: '100%',
    backgroundColor: '#6E3AFF',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    fontFamily: text.medium.fontFamily,
    color: colors.white,
    fontSize: 14,
    marginLeft: 10,
  },
})

export default GoLiveButton
