import React from 'react'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgShevronLeftLarge from '~/ui/icons/ShevronLeftLarge'
import { colors } from '~/ui/theme'
import { StyleSheet } from 'react-native'
import { Back } from '~/ui/icons'

const BackButton = ({ onPress = () => {} }) => {
  return (
    <PressableHighlight onPress={onPress} style={styles.wrap}>
      <Back width="24" height="24" style={styles.icon} />
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
})

export default BackButton
