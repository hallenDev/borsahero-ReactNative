import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { colors, text } from '~/ui/theme'
import userImage from '~/assets/images/user.png'
import FreePaidItem from '../FreePaidItem'

const DonationItem = () => (
  <View style={styles.container}>
    <FastImage source={userImage} style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.name} numberOfLines={1}>
        Jack Green
      </Text>

      <FreePaidItem isFree={false} />
    </View>

    <Text style={styles.donated}>donated</Text>
    <Text style={styles.price}>$12</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 12,
    marginRight: 15,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginBottom: 2,
    flexGrow: 1,
    flexShrink: 1,
  },
  donated: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginRight: 5,
  },
  price: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
})

export default DonationItem
