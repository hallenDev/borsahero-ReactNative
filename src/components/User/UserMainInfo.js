import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useUser } from '~/context/UserContext'
import { colors, text } from '~/ui/theme'
import { User, Income, Rate, Edit } from '~/ui/icons'
import getReadableCount from '~/utils/getReadableCount'

const UserMainInfo = ({ user }) => {
  const navigation = useNavigation()
  const { user: myUser } = useUser()

  const {
    first_name,
    last_name,
    avatar,
    total_videos = 0,
    reviews_count = 0,
    rate = 0,
  } = user || {}

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: avatar }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>
          {first_name} {last_name}
        </Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <User width={24} height={24} style={styles.icon} />
            <Text style={styles.darkText}>104k subscribers</Text>
          </View>

          <View style={[styles.row, styles.ml20]}>
            <Income width={24} height={24} style={styles.icon} />
            <Text style={styles.darkText}>
              {getReadableCount(total_videos)} videos
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Rate width={24} height={24} />
          <Text style={styles.rate}>{rate}</Text>

          <TouchableOpacity
            style={styles.ml20}
            onPress={() => navigation.navigate('Reviews', { user })}
          >
            <Text style={styles.reviewsText}>
              {getReadableCount(reviews_count)} reviews
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.name}>Bio</Text>
      {user?.bio && <Text style={styles.bioText}>{user?.bio}</Text>}

      {user?.id === myUser?.id && (
        <TouchableOpacity style={styles.editBtn}>
          <Edit width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    marginTop: 20,
    borderRadius: 24,
    padding: 25,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignSelf: 'center',
  },
  name: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginTop: 20,
  },
  userInfo: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  darkText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  ml20: {
    marginLeft: 20,
  },
  bioText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
  },
  rate: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  reviewsText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: '#946EFF',
  },
  editBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
})

export default UserMainInfo
