import { useIsFocused } from '@react-navigation/native'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import useViewVideo from '~/hooks/useViewVideo'

import { Play } from '~/ui/icons'
import Controls from './Controls'


const VideoPlayer = ({ video, containerStyle }) => {
  const isFocused = useIsFocused()
  const onViewVideo = useViewVideo()
  const videoRef = useRef()
  const playingEnded = useRef(false)
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startedPlay, setStartedPlay] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!isFocused) {
      setStartedPlay(false)
    }
  }, [isFocused])

  return (
    <View style={[styles.container, containerStyle]}>
      {startedPlay ? (
        <Video
          ref={videoRef}
          style={[styles.video]}
          source={{
            uri: video.video_url,
            title: video.name,
            description: video.description,
          }}
          poster={video.poste}
          // paused={!isPlaying}
          // onLoad={({ duration }) => setDuration(duration)}
          // onProgress={progress =>
          //   setProgress(progress.currentTime / progress.seekableDuration)
          // }
          // onEnd={() => {
          //   videoRef.current?.seek(0)
          //   playingEnded.current = true
          // }}
          // // onBuffer={data => console.log(data)}
          // onSeek={data => {
          //   if (data?.seekTime === 0 && playingEnded.current) {
          //     playingEnded.current = false
          //     setIsPlaying(false)
          //   }
          // }}
          controls
        />
      ) : (
        <>
          <FastImage
            source={{ uri: video.poster_url }}
            resizeMode="cover"
            style={styles.poster}
          />
          <TouchableOpacity
            onPress={() => {
              setStartedPlay(true)
              setIsPlaying(true)
              onViewVideo(video)
            }}
          >
            <Play width={80} height={80} />
          </TouchableOpacity>
        </>
      )}

      {/* <Controls
        isPlaying={isPlaying}
        progress={progress}
        onTogglePlay={() => setIsPlaying(b => !b)}
        onProgressChanged={p => {
          if (duration > 0) {
            videoRef.current?.seek(p * duration)
            setIsPlaying(true)
          }
        }}
        onBackward={() => {
          if (duration > 0) {
            const currentPosition = progress * duration
            videoRef.current?.seek(Math.max(0, currentPosition - 3))
          }
        }}
        onForward={() => {
          if (duration > 0) {
            const currentPosition = progress * duration
            videoRef.current?.seek(Math.min(duration, currentPosition + 3))
          }
        }}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.6,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

export default VideoPlayer
