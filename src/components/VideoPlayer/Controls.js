import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  ControlPlay,
  ControlPause,
  ControlBackward,
  ControlForward,
  ControlVolume,
} from '~/ui/icons'
import ControlBtn from './ControlBtn'
import noop from '~/utils/noop'

const Controls = ({
  progress = 0,
  isPlaying = false,
  onTogglePlay = noop,
  onProgressChanged = noop,
  onBackward = noop,
  onForward = noop,
}) => {
  return (
    <View style={styles.container}>
      <ControlBtn
        Icon={isPlaying ? ControlPause : ControlPlay}
        onPress={onTogglePlay}
      />

      <ControlBtn Icon={ControlVolume} onPress={() => {}} />

      <ControlBtn
        Icon={ControlBackward}
        width={17}
        height={17}
        onPress={onBackward}
      />

      <ControlBtn
        Icon={ControlForward}
        width={17}
        height={17}
        onPress={onForward}
      />

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
        onSlidingComplete={onProgressChanged}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  slider: {
    flexGrow: 1,
  },
})

export default Controls
