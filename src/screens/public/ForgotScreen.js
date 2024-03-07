import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BackButton } from '~/components'
import { forgotPassword, forgotPassResolver } from '~/shared/api'
import { InputField, Button } from '~/ui'
import { colors } from '~/ui/theme'
import { Logo } from '~/ui/icons'

const ForgotScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: forgotPassResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(forgotPassword, {
    onSuccess: _ => {
      navigation.navigate('ResetScreen', {
        email: form.getValues('email')?.trim(),
      })
    },
    onError: ({ data }) => {
      setMailError(data?.msg)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const onSubmit = input => {
    setLoading(true)
    mutate(input)
  }

  return (
    <FormProvider {...form}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.wrapper}
          contentContainerStyle={{ height: '100%', padding: 20 }}
        >
          <Logo width="186" height="32" />

          <View style={styles.mt30}>
            <BackButton onPress={() => navigation.goBack()} />
            <View style={styles.title}>
              <Text style={styles.maintitle}>Forgot</Text>
              <Text style={styles.maintitle}>Password?</Text>
              <Text style={styles.description}>
                That’s okay, it happens! Enter your email {'\n'}
                address below, and we will send you a{'\n'}
                letter with a link to reset it.
              </Text>
            </View>

            <View style={styles.field}>
              <InputField
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.action}>
                <Button
                  type="primary"
                  loading={loading}
                  onPress={form.handleSubmit(onSubmit)}
                  textStyle={styles.btnText}
                >
                  Confirm
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface_primary,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    paddingTop: 70,
  },
  maintitle: {
    fontWeight: '500',
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 44,
  },
  description: {
    fontSize: 16,
    color: colors.text_secondary,
    textAlign: 'center',
    lineHeight: 22.4,
  },
  background: {
    flex: 1,
  },
  field: {
    marginTop: 40,
    gap: 20,
  },
  action: {
    marginTop: 10,
  },
  btnText: {
    color: '#FFFFFF',
  },
  mt30: {
    marginTop: 30,
  },
})

export default ForgotScreen
