import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useQuery } from 'react-query'
import DeleteProfileSubscriptionModal from '~/components/Modals/DeleteProfileSubscriptionModal'
import ProfileSubscriptionModal from '~/components/Modals/ProfileSubscriptionModal'
import { getProfileSubscription } from '~/shared/api/member'
import { Button } from '~/ui'
import { ProfileSubscription as SvgProfileSubscription } from '~/ui/icons'
import { colors, text } from '~/ui/theme'

const ProfileSubscription = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const { data: profileProduct } = useQuery(
    'profile-subscription',
    () => getProfileSubscription(),
    {
      onError: error => {
        console.log(error)
      },
    },
  )

  return (
    <>
      <View style={styles.container}>
        <SvgProfileSubscription width={50} height={50} style={styles.icon} />
        <Text style={styles.title}>Profile subscription</Text>
        {profileProduct ? (
          <>
            <Text style={styles.description}>
              ${profileProduct.price / 100} per month
            </Text>
            <View style={styles.row}>
              <Button
                type="primary"
                style={styles.flex}
                onPress={() => setModalVisible(true)}
              >
                Edit
              </Button>

              <Button
                type="warning"
                style={styles.flex}
                onPress={() => setDeleteModalVisible(true)}
              >
                Remove
              </Button>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.description}>
              Set your own price for premium content and exclusive perks. Simply
              enter the desired subscription price and confirm to provide your
              audience with an enhanced experience. Your subscribers will get
              access to exclusive content, updates, and more.
            </Text>
            <Button type="primary" onPress={() => setModalVisible(true)}>
              Create profile subscription
            </Button>
          </>
        )}
      </View>

      <ProfileSubscriptionModal
        isEdit={!!profileProduct}
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
      />

      <DeleteProfileSubscriptionModal
        modalVisible={deleteModalVisible}
        onCloseModal={() => setDeleteModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#222222',
    marginTop: 20,
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginTop: 10,
    marginBottom: 3,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  flex: {
    flex: 1,
  },
})

export default ProfileSubscription
