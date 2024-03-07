import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { addReviewResolver, addReview } from '~/shared/api/member'
import { InputField, ErrorText, Button, RatingView } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'

const AddReviewModal = ({ user, modalVisible, onCloseModal }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: addReviewResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(addReview, {
    onSuccess: data => {
      queryClient.invalidateQueries(['profile', user?.id])
      queryClient.invalidateQueries(['reviews', user?.id])
      onCloseModal()
    },
    onError: ({ data }) => {},
    onSettled: _ => {
      setLoading(false)
    },
  })

  const onSubmit = input => {
    input.user_id = user.id
    console.log(input)
    setLoading(true)
    mutate(input)
  }

  useEffect(() => {
    if (modalVisible) {
      form.clearErrors()
    }
  }, [modalVisible])

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <FormProvider {...form}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Add review</Text>

            <RatingView name="rate" defaultValue={0} />

            <ErrorText error={form.formState.errors?.rate?.message} />

            <InputField
              name="review"
              placeholder="Description"
              multiline
              maxLength={250}
              containerStyle={styles.description}
            />

            <View style={styles.row}>
              <Button type="white" style={styles.flex} onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                type="primary"
                style={styles.flex}
                loading={loading}
                onPress={form.handleSubmit(onSubmit)}
              >
                Add review
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
    paddingBottom: 0,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
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
  description: {
    height: 80,
    textAlignVertical: 'top',
    alignItems: 'flex-start',
    borderRadius: 16,
    paddingVertical: 5,
  },
})

export default AddReviewModal
