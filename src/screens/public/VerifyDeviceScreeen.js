import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { useMutation } from 'react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PinInput from '~/components/PinInput'
import { useUser } from '~/context/UserContext'
import { register, registerOTP } from '~/shared/api/public'
import { Button } from '~/ui'
import { colors, typography } from '~/ui/theme'
import { Logo } from '~/ui/icons'
import getTime from '~/utils/getTime'

const limit = 900

const VerifyDeviceScreen = ({ navigation, route }) => {
  const { setUser } = useUser()
  const { email, password } = route.params || {}
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [count, setCount] = useState(limit)
  const [loading, setLoading] = useState(false)

  const { mutate: resendCode } = useMutation(register, {
    onSuccess: _ => setCount(limit),
  })

  const { mutate: verifyCode } = useMutation(registerOTP, {
    onSuccess: data => {
      setUser(data?.user)
    },
    onError: ({ data }) => {
      setError(data?.msg)
    },
    onSettled: _ => setLoading(false),
  })

  useEffect(() => {
    setCount(limit)

    const interval = setInterval(
      () => setCount(prevCount => (prevCount ? prevCount - 1 : 0)),
      1000,
    )

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleVerifyCodeChange = _code => {
    setError('')
    setCode(_code)
  }

  const handleResend = () => {
    if (count > 0) return
    setError('')

    resendCode({
      email,
      password,
    })
  }

  const onSubmit = () => {
    Keyboard.dismiss()

    setLoading(true)
    verifyCode({
      email,
      otpCode: code,
    })
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}
      >
        <Logo width="186" height="32" />

        <View style={styles.mainwrapper}>
          <View style={styles.title}>
            <Text style={styles.maintitle}>Confirm your{`\n`}email</Text>
            <Text style={styles.description}>
              Please enter the code sent to
            </Text>
            <Text style={styles.description}>{route.params?.email}</Text>
          </View>
          <View style={styles.field}>
            <PinInput onChange={handleVerifyCodeChange} error={error} />

            <Text style={styles.forgot} onPress={handleResend}>
              {count > 0 ? getTime(count) : 'Resend code'}
            </Text>
            <View style={styles.action}>
              <Button
                type="primary"
                loading={loading}
                onPress={onSubmit}
                textStyle={styles.btnText}
              >
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
    gap: 40,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
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
  circle: {
    borderRadius: 1000,
  },
  field: {
    gap: 20,
  },
  action: {
    marginTop: 10,
  },
  btnText: {
    color: '#FFFFFF',
  },
  forgot: {
    ...typography.p2,
    color: colors.text_accent,
    textAlign: 'right',
  },
})

export default VerifyDeviceScreen
