import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, typography } from '~/ui/theme'
import { Subscriber } from '~/ui/icons'
import getReadableCount from '~/utils/getReadableCount'

const LiveElem = ({ viewCount }) => (
  <View style={styles.elem}>
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.text}>LIVE</Text>
      </View>
    </View>
    <Subscriber width={14} height={14} />
    <Text style={styles.subscribers}>{getReadableCount(viewCount || 0)}</Text>
  </View>
)

const styles = StyleSheet.create({
  elem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 53, 53, 0.4)',
    padding: 3,
    marginRight: 10,
  },
  inner: {
    width: '100%',
    backgroundColor: '#ff3535',
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    ...typography.p1,
    color: colors.white,
    fontSize: 12,
  },
  subscribers: {
    ...typography.p1,
    color: colors.white,
    fontSize: 12,
    marginLeft: 3,
  },
})

export default LiveElem
