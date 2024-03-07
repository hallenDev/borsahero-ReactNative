import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import ReviewsHeader from '~/components/Reviews/ReviewsHeader'
import ReviewItem from '~/components/Reviews/ReviewItem'
import DeleteReviewModal from '~/components/Modals/DeleteReviewModal'
import { useUser } from '~/context/UserContext'
import { getReviews } from '~/shared/api/member'

const ReviewsScreen = ({ route }) => {
  const { user } = route.params || {}
  const { user: myUser } = useUser()
  const [deleteReview, setDeleteReview] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const { data } = useQuery(['reviews', user?.id], () => getReviews(user?.id))
  const { reviews = [], rate = 0 } = data || {}

  const renderItem = ({ item }) => (
    <ReviewItem
      {...item}
      canDelete={item?.ratedByUser?.id === myUser?.id}
      onDelete={() => {
        setDeleteReview(item)
        setModalVisible(true)
      }}
    />
  )

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={reviews}
        ListHeaderComponent={<ReviewsHeader rate={rate} user={user} />}
        renderItem={renderItem}
        indicatorStyle="white"
      />

      <DeleteReviewModal
        user={user}
        review={deleteReview}
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})

export default ReviewsScreen
