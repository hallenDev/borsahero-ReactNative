import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PinInput from '~/components/PinInput'
import { InputField, ErrorText, Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'

const Step1 = ({ setStep, onCloseModal }) => {
  const form = useForm({
    reValidateMode: 'onSubmit',
  })

  const handleChange = (name, value) => {}

  return (
    <FormProvider {...form}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Change email</Text>
            <Text style={styles.description}>
              Before making changes, give us a nod with your password, please.
            </Text>
          </View>

          <InputField
            name="password"
            placeholder="Password"
            autoComplete="username"
            autoCapitalize="none"
            containerStyle={{ flex: 0 }}
            // error={passwordError}
            // secureTextEntry={true}
            change={handleChange}
          />

          <InputField
            name="email"
            placeholder="New email"
            autoComplete="username"
            autoCapitalize="none"
            containerStyle={{ flex: 0 }}
            // error={passwordError}
            // secureTextEntry={true}
            change={handleChange}
          />

          <View style={styles.row}>
            <Button type="white" style={styles.flex} onPress={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              style={styles.flex}
              onPress={() => setStep(2)}
            >
              Change
            </Button>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onCloseModal}>
            <Close width={16} height={16} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </FormProvider>
  )
}

const Step2 = ({ setStep, onCloseModal }) => {
  const form = useForm({
    reValidateMode: 'onSubmit',
  })

  const handleChange = (name, value) => {}

  return (
    <FormProvider {...form}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Almost done!</Text>
            <Text style={styles.description}>
              We have sent a confirmation code to your current email. Please
              enter it to confirm your email change.
            </Text>
          </View>

          <PinInput />

          <TouchableOpacity style={styles.resendBtn}>
            <Text style={styles.resendBtnText}>Resend code</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Button type="white" style={styles.flex} onPress={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              style={styles.flex}
              onPress={() => {
                onCloseModal()
                setStep(1)
              }}
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
  )
}

const ChangeEmailModal = ({ modalVisible, onCloseModal }) => {
  const [step, setStep] = useState(1)
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      {step === 1 ? (
        <Step1 setStep={setStep} onCloseModal={onCloseModal} />
      ) : (
        <Step2 setStep={setStep} onCloseModal={onCloseModal} />
      )}
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
  field: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  flex: {
    flex: 1,
  },
  resendBtn: {
    alignSelf: 'flex-end',
  },
  resendBtnText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: '#946EFF',
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

export default ChangeEmailModal
