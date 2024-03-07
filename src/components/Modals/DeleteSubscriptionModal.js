import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { cancelSubscription } from '~/shared/api/member'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { DeleteAccount as SvgDeleteAccount } from '~/ui/icons'
import { Close } from '~/ui/icons'
import noop from '~/utils/noop'

const DeleteSubscriptionModal = ({ modalVisible, onCloseModal = noop }) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(cancelSubscription, {
    onSuccess: data => {
      if (data?.is_cancelled) {
        queryClient.setQueryData('subscription', old => ({
          ...old,
          subscription: {
            ...old?.subscription,
            is_cancelled: true,
          },
        }))
      }
      onCloseModal()
    },
    onError: error => {
      console.log(error)
    },
  })

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <SvgDeleteAccount width={50} height={50} style={styles.icon} />
          <View>
            <Text style={styles.title}>Cancel subscription?</Text>
            <Text style={styles.description}>
              Your subscription will remain active until the next invoice date.
              After that, it will become inactive.
            </Text>
          </View>
          <View style={styles.row}>
            <Button type="white" style={styles.flex} onPress={onCloseModal}>
              Exit
            </Button>
            <Button
              type="warning"
              style={styles.flex}
              loading={isLoading}
              onPress={mutate}
            >
              Cancel
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
  icon: {
    alignSelf: 'center',
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

export default DeleteSubscriptionModal
