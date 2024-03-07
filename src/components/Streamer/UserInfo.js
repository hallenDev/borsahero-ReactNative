import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { colors, text } from '~/ui/theme'
import getReadableCount from '~/utils/getReadableCount'

const UserInfo = ({ user }) => {
  const navigation = useNavigation()

  const gotoUserProfile = () => {
    navigation.navigate('UserProfile', { user })
  }

  return (
    <TouchableOpacity style={styles.userInfo} onPress={gotoUserProfile}>
      <FastImage
        source={{ uri: user?.avatar }}
        style={styles.userImage}
        resizeMode="cover"
      />
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
          {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.views}>
          {getReadableCount(user?.view_count || 0)} viewed
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  userImage: {
    width: 28,
    height: 28,
    marginRight: 8,
    borderRadius: 14,
  },
  userName: {
    fontFamily: text.regular.fontFamily,
    color: colors.white,
    fontSize: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 10,
  },
  views: {
    fontFamily: text.regular.fontFamily,
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
})

export default UserInfo
