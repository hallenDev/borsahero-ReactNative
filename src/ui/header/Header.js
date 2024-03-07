import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Logo } from '~/ui/icons'
import { colors } from '~/ui/theme'

const Header = ({
  leftComponent,
  centerComponent,
  rightComponent,
  shadow = true,
  backgroundColor = 'transparent',
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor },
          shadow && { paddingVertical: 6 },
        ]}
      >
        {leftComponent && <View style={styles.left}>{leftComponent}</View>}
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    minHeight: 44,
  },
  left: {
    alignItems: 'baseline'
  },
  right: {
    position: 'absolute',
  },
  center: {
    // height: 35,
    // paddingVertical: 2,
  },
  shadow: {
    backgroundColor: colors.semiBlack25,
    height: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
})

export default Header
