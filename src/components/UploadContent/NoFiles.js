import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { colors, text } from '~/ui/theme'
import { UploadMedia } from '~/ui/icons'

const NoFiles = ({ error, onPress }) => (
  <View style={styles.container(!!error)}>
    <TouchableOpacity onPress={onPress}>
      <UploadMedia width={45} height={45} />
    </TouchableOpacity>
    <Text style={styles.title}>No files yet</Text>
    <Text style={styles.desc}>
      .mp4, .mov, or .avi format. Max size is 10GB.
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: error => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: error ? '#FF3535' : '#222222',
    backgroundColor: '#222222',
    paddingHorizontal: 15,
    paddingVertical: 45,
    marginTop: 20,
  }),
  title: {
    fontFamily: text.bold.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginTop: 20,
  },
  desc: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 5,
    textAlign: 'center',
  },
  mt10: {
    marginTop: 10,
  },
})

export default NoFiles
