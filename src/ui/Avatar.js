import React, { useState } from 'react'
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import { useMutation } from 'react-query'
import { useUser } from '~/context/UserContext'
import { uploadPhoto } from '~/shared/api/member'
import { ErrorText } from '~/ui'
import { colors } from '~/ui/theme'
import { DownOn, DownOff } from '~/ui/icons'
import placeholder from '~/assets/images/Avatar.png'

const Avatar = ({ size = 40, resizeMode = 'cover' }) => {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { mutate } = useMutation(uploadPhoto, {
    onSuccess: data => {
      setUser(data?.user, true)
    },
    onError: ({ data }) => {
      setError(data?.msg)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const uploadProfilePhoto = object => {
    setLoading(true)
    setError('')
    mutate({
      uri: object.uri,
      type: object.type,
      name: object.fileName,
    })
  }

  const selectPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1200,
        quality: 0.8,
        selectionLimit: 1, // 0 | 1
      },
      response => {
        if (response.didCancel || response.error) return

        uploadProfilePhoto(response.assets[0])
      },
    )
  }

  const handleRemoveAvatar = () => {}

  return (
    <View style={styles.container}>
      <View style={styles.avatar(error)}>
        <Pressable onPress={() => selectPhoto()}>
          <FastImage
            source={{ uri: user?.avatar }}
            style={styles.image(size)}
            defaultSource={placeholder}
            resizeMode={resizeMode}
          />
        </Pressable>
        {!loading && (
          <View style={styles.down(size)}>
            {user?.avatar ? (
              <Pressable onPress={() => handleRemoveAvatar()}>
                <DownOff />
              </Pressable>
            ) : (
              <Pressable onPress={() => selectPhoto()}>
                <DownOn />
              </Pressable>
            )}
          </View>
        )}
      </View>
      {!!error && (
        <ErrorText
          error={error}
          style={styles.error}
          textStyle={styles.errorText}
        />
      )}
      {loading && (
        <View style={styles.indicatorWrap}>
          <ActivityIndicator color={colors.white} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: error => ({
    alignSelf: 'center',
    marginBottom: error ? 20 : 0,
  }),
  image: size => ({
    borderRadius: size,
    overflow: 'hidden',
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  down: size => ({
    position: 'absolute',
    bottom: 2,
    left: size - 34,
  }),
  container: {},
  indicatorWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    justifyContent: 'center',
  },
  errorText: {
    flexGrow: 0,
    textAlign: 'center',
  },
})

export default Avatar
