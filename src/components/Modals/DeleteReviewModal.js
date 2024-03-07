import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { deleteReview } from '~/shared/api/member'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'

const DeleteReviewModal = ({ user, review, modalVisible, onCloseModal }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const { mutate } = useMutation(() => deleteReview(review?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', user?.id])
      queryClient.invalidateQueries(['reviews', user?.id])
      onCloseModal()
    },
    onError: error => {
      console.log(error)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const handleDelete = () => {
    setLoading(true)
    mutate()
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Delete review?</Text>
            <Text style={styles.description}>
              This is a one-way ticket – no turning back!
            </Text>
          </View>
          <View style={styles.row}>
            <Button type="white" style={styles.flex} onPress={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="warning"
              style={styles.flex}
              loading={loading}
              onPress={handleDelete}
            >
              Delete
            </Button>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onCloseModal}>
            <Close width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#141414',
    padding: 25,
    borderRadius: 30,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 0,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  flex: {
    flex: 1,
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    position: 'absolute',
    right: 20,
    top: 20,
  },
})

export default DeleteReviewModal
