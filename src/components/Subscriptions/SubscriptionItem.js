import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import UnsubscribeButton from '~/components/Streamer/UnsubscribeButton'
import { colors, text } from '~/ui/theme'
import useDateTime from '~/utils/useDateTime'

const SubscriptionItem = ({
  status,
  ended_at,
  price = 0,
  profileUser,
  isFree = false,
}) => {
  const navigation = useNavigation()
  const { getSubscriptionDate } = useDateTime()

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate('UserProfile', { user: profileUser })
          }
        >
          <FastImage
            source={{ uri: profileUser?.avatar }}
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            {profileUser.first_name} {profileUser.last_name}
          </Text>
        </TouchableOpacity>

        <View style={styles.activeWrap}>
          <Text style={styles.active}>
            {status?.includes('incomplete') ? 'Pending' : 'Active'}
          </Text>
        </View>
      </View>

      <View>
        {isFree ? (
          <View style={[styles.row, styles.bottom]}>
            <Text style={styles.priceInfo}>
              <Text style={styles.price}>Free</Text> per month
            </Text>
            <UnsubscribeButton />
          </View>
        ) : (
          <>
            <Text style={styles.priceInfo}>
              <Text style={styles.price}>${price / 100}</Text> per month
            </Text>

            <View style={[styles.row, styles.bottom]}>
              <Text style={styles.priceInfo}>
                Next invoice{' '}
                <Text style={styles.white}>
                  {getSubscriptionDate(Number(ended_at * 1000))}
                </Text>
              </Text>
              <UnsubscribeButton />
            </View>
          </>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#222222',

    padding: 10,
    height: 135,
    justifyContent: 'space-between',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  userName: {
    fontFamily: text.medium.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginLeft: 10,
  },
  activeWrap: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    backgroundColor: 'rgba(133, 255, 58, 0.1)',
  },
  active: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: '#85FF3A',
  },
  priceInfo: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  price: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  white: {
    color: colors.white,
  },
  bottom: {
    height: 30,
  },
})

export default SubscriptionItem
