import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TitleHeader from '~/components/Headers/TitleHeader'
import AddReviewModal from '~/components/Modals/AddReviewModal'
import { useUser } from '~/context/UserContext'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Rate, Filter, DownArrow } from '~/ui/icons'

const ReviewsHeader = ({ rate, user }) => {
  const { user: myUser } = useUser()
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TitleHeader
        title="Reviews"
        RightComponent={<Text style={styles.reviewCount}>70</Text>}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.userInfo}>
        <FastImage
          source={{ uri: user?.avatar }}
          resizeMode="cover"
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.first_name} {user?.last_name}
        </Text>

        <Rate width={24} height={24} />
        <Text style={styles.rate}>{rate || user?.rate}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.dropdown}>
          <Filter width={20} height={20} />
          <Text style={styles.recent}>Recent first</Text>
          <DownArrow width={20} height={20} />
        </TouchableOpacity>

        {user?.id !== myUser?.id && (
          <Button type="primary" onPress={() => setModalVisible(true)}>
            Add review
          </Button>
        )}
      </View>

      <AddReviewModal
        user={user}
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  reviewCount: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 5,
    marginLeft: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  name: {
    fontFamily: text.bold.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 15,
  },
  rate: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginLeft: 3,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  recent: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginHorizontal: 15,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 50,
  },
})

export default ReviewsHeader
