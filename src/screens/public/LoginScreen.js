import { useIsFocused } from '@react-navigation/native'
import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useUser } from '~/context/UserContext'
import { signIn, signinResolver } from '~/shared/api'
import { InputField, ErrorText, Button } from '~/ui'
import { colors, typography } from '~/ui/theme'
import { Logo } from '~/ui/icons'
import { isValidEmail } from '~/utils/checkValidation'

const LoginScreen = ({ navigation }) => {
  const { setUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [blockError, setBlockError] = useState('')
  const isFocused = useIsFocused()

  const form = useForm({
    resolver: signinResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(signIn, {
    onSuccess: data => {
      setUser(data?.user)
    },
    onError: ({ status, data }) => {
      if (status == 400) {
        form.setError('email', { message: data?.msg })
      }
      if (status == 401) {
        form.setError('password', { message: data?.msg })
      }
      if (status == 402) {
        setBlockError(
          "Seems like you've been blocked by an Admin. If you think there is a mistake, please contact ",
        )
      }
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  useEffect(() => {
    form.setValue('email', '')
    form.setValue('password', '')
    form.clearErrors()
    setBlockError('')
  }, [isFocused])

  const onSubmit = input => {
    setLoading(true)
    mutate(input)
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
              <Text style={styles.title}>Welcome</Text>
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
                  autoComplete="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />

                <ErrorText error={blockError} email="email@borsahero.com" />
                <View
                  style={{
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Text
                    style={styles.forgot}
                    onPress={() =>
                      navigation.navigate('ForgotScreen', {
                        email: form.getValues('email'),
                      })
                    }
                  >
                    Forgot password?
                  </Text>
                </View>
                <View style={styles.action}>
                  <Button
                    type="primary"
                    loading={loading}
                    onPress={form.handleSubmit(onSubmit)}
                    textStyle={styles.btnText}
                  >
                    Login
                  </Button>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.signUpText}>
                New here?{' '}
                <Text
                  onPress={() => {
                    Keyboard.dismiss()
                    setTimeout(() => navigation.navigate('SignUpScreen'), 500)
                  }}
                  style={styles.signUpAction}
                >
                  Create an account
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
    padding: 20,
  },
  contentContainer: {
    height: '100%',
  },
  mainwrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 40,
  },
  background: {
    flex: 1,
  },
  field: {
    gap: 20,
  },
  action: {
    marginTop: 10,
  },
  btnText: {
    color: colors.white,
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
  forgot: {
    ...typography.p2,
    color: colors.text_accent,
  },
})

export default LoginScreen
