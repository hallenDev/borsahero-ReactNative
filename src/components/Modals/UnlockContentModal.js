import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  subscribeProfilePlan,
  getProfileSubscription,
} from '~/shared/api/member'
import { Button, Modal } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'
import { useToast } from 'react-native-toast-notifications'

const UnlockContentModal = ({ user, modalVisible, onCloseModal }) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const modalRef = useRef()

  const { data: plan, isLoading: isLoadingPlan } = useQuery(
    ['profile-plan', user?.id],
    () => getProfileSubscription(user?.id),
    {
      onError: error => {
        toast.show('', {
          type: 'notification',
          data: { title: error?.data?.msg, error: true },
        })
        onCloseModal()
      },
    },
  )

  const { mutate, isLoading } = useMutation(subscribeProfilePlan, {
    onSuccess: data => {
      queryClient.setQueryData(['videos', user?.id], old =>
        old?.map(c => ({ ...c, shouldSubscribe: false })),
      )
      queryClient.setQueryData(['playlists', user?.id], old =>
        old?.map(c => ({ ...c, shouldSubscribe: false })),
      )

      queryClient.setQueryData('popular-playlists', old =>
        old?.map(c =>
          c?.user?.id === user?.id ? { ...c, shouldSubscribe: false } : c,
        ),
      )

      onCloseModal()
    },
    onError: error => {
      modalRef.current?.showToast(error?.data?.msg)
    },
  })

  return (
    <Modal
      ref={modalRef}
      visible={modalVisible}
      onRequestClose={() => !isLoading && onCloseModal()}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          {isLoadingPlan ? (
            <>
              <ActivityIndicator />
              <Text style={[styles.title, { textAlign: 'center' }]}>
                Please wait...
              </Text>
            </>
          ) : (
            <View>
              <Text style={styles.title}>
                Unlock premium content for only ${plan?.price / 100} per month!
              </Text>
              <Text style={styles.description}>
                Subscribe to go unlimited and enjoy exclusive videos. Upgrade
                now for an enhanced experience.
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Button
              type="white"
              style={styles.flex}
              isDisabled={isLoading}
              onPress={onCloseModal}
            >
              Cancel
            </Button>
            {!isLoadingPlan && (
              <Button
                type="primary"
                style={styles.flex}
                loading={isLoading}
                onPress={() => mutate({ user_id: user.id })}
              >
                Unlock
              </Button>
            )}
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            disabled={isLoading}
            onPress={onCloseModal}
          >
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
    marginTop: 10,
    paddingRight: 25,
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

export default UnlockContentModal
