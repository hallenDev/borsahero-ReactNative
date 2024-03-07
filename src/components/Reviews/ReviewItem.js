import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Rating } from 'react-native-ratings'
import { colors, text } from '~/ui/theme'
import { Trash } from '~/ui/icons'
import noop from '~/utils/noop'
import useDateTime from '~/utils/useDateTime'

const ReviewItem = ({
  rate,
  review,
  created_at: createdAt,
  ratedByUser,
  canDelete = false,
  onDelete = noop,
}) => {
  const { getPublishDate } = useDateTime()
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FastImage
          source={{ uri: ratedByUser?.avatar }}
          resizeMode="cover"
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>
            {ratedByUser?.first_name} {ratedByUser?.last_name}
          </Text>
          <Text style={styles.date}>{getPublishDate(createdAt)}</Text>
        </View>
      </View>
      <Rating
        type="custom"
        ratingCount={5}
        startingValue={rate}
        imageSize={20}
        tintColor="#222222"
        readonly
        style={styles.rating}
        ratingColor="#946EFF"
      />

      <Text style={styles.review}>{review}</Text>

      {canDelete && (
        <TouchableOpacity style={styles.trashBtn} onPress={onDelete}>
          <Trash width={24} height={24} color={'#FF3535'} />
        </TouchableOpacity>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222222',
    borderRadius: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontFamily: text.medium.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  date: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  review: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 20,
    marginTop: 10,
  },
  trashBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  rating: {
    marginTop: 5,
    alignItems: 'flex-start',
  },
})

export default ReviewItem
