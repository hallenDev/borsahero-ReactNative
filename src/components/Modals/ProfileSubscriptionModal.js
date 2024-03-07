import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { InputField, Button, Modal } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'
import {
  createProfileSubscription,
  editProfileSubscription,
  profileSubscriptionResolver,
} from '~/shared/api/member'

const ProfileSubscription = ({
  modalVisible,
  isEdit = false,
  onCloseModal,
}) => {
  const modalRef = useRef()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    isEdit ? editProfileSubscription : createProfileSubscription,
    {
      onSuccess: profileProduct => {
        queryClient.setQueryData('profile-subscription', old => ({
          ...profileProduct,
        }))
        onCloseModal()
      },
      onError: error => {
        modalRef.current?.showToast(error?.data?.msg)
      },
    },
  )

  const form = useForm({
    resolver: profileSubscriptionResolver,
    reValidateMode: 'onSubmit',
  })

  const onSubmit = input => {
    mutate(input)
  }

  useEffect(() => {
    if (modalVisible) {
      form.clearErrors()
    }
  }, [modalVisible])

  return (
    <Modal ref={modalRef} visible={modalVisible} onRequestClose={onCloseModal}>
      <FormProvider {...form}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>
                {isEdit
                  ? 'Edit profile subscription'
                  : 'Create profile subscription'}
              </Text>
              <Text style={styles.description}>Please set the price</Text>
            </View>

            <InputField
              name="price"
              placeholder="$0.0 per month"
              keyboardType="decimal-pad"
              autoCapitalize="none"
            />

            <View style={styles.row}>
              <Button type="white" style={styles.flex} onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                type="primary"
                style={styles.flex}
                loading={isLoading}
                onPress={form.handleSubmit(onSubmit)}
              >
                Confirm
              </Button>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onCloseModal}>
              <Close width={16} height={16} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </FormProvider>
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

export default ProfileSubscription
