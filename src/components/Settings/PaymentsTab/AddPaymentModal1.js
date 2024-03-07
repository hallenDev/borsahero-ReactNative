import {
  CardField,
  useStripe,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useMutation } from 'react-query'
import valid from 'card-validator'
import CreditCardBrandsMap from '~/shared/types/CreditCardBrandsMap'
import { addPaymentMethod } from '~/shared/api/member'
import { InputField, MaskInputField, Button } from '~/ui'
import { Close } from '~/ui/icons'
import { colors, text } from '~/ui/theme'
import { CREDIT_CARD_MASK, EXP_MASK } from '~/utils/creditCardMasks'

const AddPaymentModal = ({ modalVisible, onCloseModal }) => {
  const [loading, setLoading] = useState(false)
  const { createToken } = useStripe()
  const { confirmSetupIntent } = useConfirmSetupIntent()

  const { mutate } = useMutation(addPaymentMethod, {
    onSuccess: data => {},
    onError: ({ data }) => {},
    onSettled: _ => {
      setLoading(false)
    },
  })

  const form = useForm({
    reValidateMode: 'onSubmit',
  })

  const [card_number] = form.watch(['card_number'])
  const cardNumber = card_number?.replace(' ', '')
  const numberValidation = valid.number(cardNumber)

  const onSubmit = async input => {
    let hasError = false
    if (!numberValidation.isValid) {
      form.setError('card_number', { message: 'Enter valid card number.' })
      hasError = true
    }

    const holderValidation = valid.cardholderName(input.card_holder)
    if (!holderValidation.isValid) {
      form.setError('card_holder', { message: 'Enter valid holder name.' })
      hasError = true
    }

    const expValidation = valid.expirationDate(input.card_exp)
    if (!expValidation.isValid) {
      form.setError('card_exp', { message: 'Enter valid exp date.' })
      hasError = true
    }

    const cvvValidation = valid.cvv(input.card_cvv)
    if (!cvvValidation.isValid) {
      form.setError('card_cvv', { message: 'Enter valid cvv.' })
      hasError = true
    }

    if (hasError) return

    console.log(input)

    // setLoading(true)

    try {
      const token = await createToken({ type: 'Card' })
      console.log(token, 'fff')

      // mutate({
      //   number: input.card_number.replace(' ', ''),
      //   exp_month: expValidation.month,
      //   exp_year: expValidation.year,
      //   cvc: input.card_cvv,
      //   brand: numberValidation.card.type,
      //   holder_name: input.card_holder.trim(),
      // })
    } catch (error) {
      console.log(error, 'error')
    }
  }

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
            <LinearGradient
              colors={['#000000', '#6E3AFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardBack}
            >
              <CardField
                autofocus
                postalCodeEnabled={false}
                onCardChange={cardDetails => {
                  console.log('card details', cardDetails)
                }}
                style={styles.cardField}
              />

              <Image
                source={
                  CreditCardBrandsMap[numberValidation?.card?.type] ||
                  CreditCardBrandsMap.unknown
                }
                style={styles.cardType}
              />

              <View>
                <MaskInputField
                  name="card_number"
                  placeholder="Card number"
                  keyboardType="number-pad"
                  mask={CREDIT_CARD_MASK}
                  containerStyle={styles.cardField}
                  errorShow={false}
                />
                <View style={styles.row}>
                  <InputField
                    name="card_holder"
                    placeholder="Add name"
                    style={styles.flex}
                    containerStyle={styles.cardField}
                    errorShow={false}
                  />
                  <MaskInputField
                    name="card_exp"
                    placeholder="Exp. date"
                    keyboardType="number-pad"
                    mask={EXP_MASK}
                    containerStyle={[styles.cardExp, styles.cardField]}
                    errorShow={false}
                  />
                </View>
              </View>
            </LinearGradient>

            <InputField
              name="card_cvv"
              placeholder="CVV code"
              keyboardType="number-pad"
              containerStyle={styles.cardField}
              errorShow={false}
            />

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
  cardBack: {
    padding: 15,
    borderRadius: 20,
    aspectRatio: 1.5,
    justifyContent: 'space-between',
  },
  cardField: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
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
    height: 50,
    marginVertical: 30,
  },
})
export default AddPaymentModal
