import { useIsFocused } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Keyboard } from 'react-native'
import { useMutation } from 'react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, FormProvider } from 'react-hook-form'
import { register, signupResolver } from '~/shared/api'
import { InputField, Button, ErrorText } from '~/ui'
import { colors, typography } from '~/ui/theme'
import { Logo, AgreeOn, AgreeOff } from '~/ui/icons'

const SignUpScreen = ({ navigation }) => {
  const [term, setTerm] = useState(false)

  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  const form = useForm({
    resolver: signupResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(register, {
    onSuccess: _ => {
      navigation.navigate('VerifyDeviceScreen', {
        email: form.getValues('email')?.trim(),
        password: form.getValues('password'),
      })
    },
    onError: ({ data }) => {
      form.setError('email', { message: data?.msg })
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  useEffect(() => {
    form.setValue('email', '')
    form.setValue('password', '')
    form.setValue('confirmpassword', '')
    form.setValue('terms', false)

    form.clearErrors()
  }, [isFocused])

  const onSubmit = input => {
    setLoading(true)
    mutate({
      ...input,
      email: input?.email?.trim(),
    })
  }

  return (
    <FormProvider {...form}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.contentContainer}
          alwaysBounceVertical={false}
        >
          <View style={styles.mainwrapper}>
            <Logo width="186" height="32" />
            <View>
              <Text style={styles.title}>Sign Up</Text>
              <View style={styles.field}>
                <InputField
                  name="email"
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <InputField
                  name="password"
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <InputField
                  name="confirmpassword"
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <View style={styles.term}>
                  <Pressable
                    onPress={() => {
                      setTerm(b => !b)
                      form.setValue('terms', !term)
                    }}
                  >
                    {term ? (
                      <AgreeOn width="24" height="24" />
                    ) : (
                      <AgreeOff width="24" height="24" />
                    )}
                  </Pressable>
                  <Text style={styles.signUpText}>
                    Agree with{' '}
                    <Text
                      onPress={() => {
                        Keyboard.dismiss()
                        setTimeout(
                          () => navigation.navigate('TermsScreen'),
                          500,
                        )
                      }}
                      style={styles.signUpAction}
                    >
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
                <ErrorText error={form.formState.errors?.terms?.message} />
                <View style={styles.action}>
                  <Button
                    type="primary"
                    loading={loading}
                    onPress={form.handleSubmit(onSubmit)}
                    textStyle={styles.btnText}
                  >
                    Create account
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.signUpText}>
                Already have an account?{' '}
                <Text
                  onPress={() => {
                    Keyboard.dismiss()
                    setTimeout(() => navigation.navigate('LoginScreen'), 500)
                  }}
                  style={styles.signUpAction}
                >
                  Sign in
                </Text>
              </Text>
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
  contentContainer: {
    padding: 20,
    minHeight: '100%',
  },
  mainwrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  field: {
    marginTop: 40,
    gap: 20,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  term: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  action: {},
  btnText: {
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  signUpText: {
    ...typography.p2,
    color: colors.white,
  },
  signUpAction: {
    ...typography.p2,
    color: colors.text_accent,
  },
})

export default SignUpScreen
