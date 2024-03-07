import {
  CardField,
  useStripe,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'
import { useQueryClient } from 'react-query'
import { createSetupIntentSecret } from '~/shared/api/member'
import { InputField, ErrorText, Button } from '~/ui'
import { Close } from '~/ui/icons'
import { colors, text } from '~/ui/theme'
import noop from '~/utils/noop'

const AddPaymentModal = ({ modalVisible, onCloseModal = noop }) => {
  const queryClient = useQueryClient()
  const [cardDetails, setCardDetails] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { createToken } = useStripe()
  const { confirmSetupIntent } = useConfirmSetupIntent()

  const form = useForm({
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async input => {
    form.clearErrors()
    setError('')

    let hasError = false
    if (!cardDetails?.complete) {
      hasError = true
    }
    if (!input.card_holder.trim().length) {
      form.setError('card_holder', { message: 'Enter valid holder name.' })
      hasError = true
    }

    if (hasError) return

    setLoading(true)
    try {
      const { token } = await createToken({
        type: 'Card',
        name: input.card_holder,
      })

      const secretResult = await createSetupIntentSecret()

      const { error, setupIntent } = await confirmSetupIntent(
        secretResult.setupIntent,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            token: token?.id,
          },
        },
      )

      if (error) {
        setError(error.message)
      } else {
        queryClient.setQueryData('payment-details', old => ({
          brand: setupIntent.paymentMethod.Card.brand.toLowerCase(),
          last4: setupIntent.paymentMethod.Card.last4,
          name: setupIntent.paymentMethod.billingDetails.name,
        }))

        onCloseModal()
      }
    } catch (error) {
      console.log(error)
      setError(
        error?.message ||
          'Error hapened. Please check the payment details and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (modalVisible) {
      setError('')
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
            <Text style={styles.title}>Add payment details</Text>

            <CardField
              autofocus
              postalCodeEnabled={false}
              cardStyle={{
                color: colors.white,
                fontSize: 14,
                textColor: colors.white,
                textErrorColor: colors.destructive_red,
                placeholderColor: '#5fffffff',
              }}
              onCardChange={setCardDetails}
              style={styles.cardField}
            />

            <InputField
              name="card_holder"
              placeholder="Add name"
              containerStyle={styles.cardHolder}
              errorShow={false}
            />

            <ErrorText error={error} />

            <View style={styles.actions}>
              <Button type="white" style={styles.flex} onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                type="primary"
                style={styles.flex}
                loading={loading}
                onPress={form.handleSubmit(onSubmit)}
              >
                Save
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
    overflow: 'hidden',
  },
  cardHolder: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  flex: {
    flex: 1,
  },
  cardExp: {
    width: 90,
    marginLeft: 10,
  },
  cardType: {
    width: 50,
    height: 33,
    resizeMode: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: text.regular.fontFamily,
    color: colors.white,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
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
  cardField: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border_primary,
  },
})
export default AddPaymentModal
