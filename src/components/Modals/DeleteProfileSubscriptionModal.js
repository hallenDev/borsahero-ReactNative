import React, { useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { deleteProfileSubscription } from '~/shared/api/member'
import { Button, Modal } from '~/ui'
import { colors, text } from '~/ui/theme'
import { DeleteAccount as SvgDeleteAccount } from '~/ui/icons'
import { Close } from '~/ui/icons'
import { useToast } from 'react-native-toast-notifications'

const DeleteProfileSubscriptionModal = ({ modalVisible, onCloseModal }) => {
  const modalRef = useRef()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(deleteProfileSubscription, {
    onSuccess: data => {
      queryClient.setQueryData('profile-subscription', old => null)
      onCloseModal()
    },
    onError: error => {
      modalRef.current?.showToast(error?.data?.msg)
    },
  })
  return (
    <Modal ref={modalRef} visible={modalVisible} onRequestClose={onCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <SvgDeleteAccount width={50} height={50} style={styles.icon} />
          <View>
            <Text style={styles.title}>Remove profile subscription?</Text>
            <Text style={styles.description}>
              If you remove profile subscription, your paid content will become
              free. There will be no way to restore it.
            </Text>
          </View>
          <View style={styles.row}>
            <Button type="white" style={styles.flex} onPress={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="warning"
              style={styles.flex}
              loading={isLoading}
              onPress={mutate}
            >
              Remove
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

export default DeleteProfileSubscriptionModal
