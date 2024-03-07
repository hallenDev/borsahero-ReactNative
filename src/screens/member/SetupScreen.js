import { useIsFocused } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDebouncedCallback } from 'use-debounce'
import { useUser } from '~/context/UserContext'
import {
  validateUsername,
  updateProfile,
  updateProfileResolver,
} from '~/shared/api/member'
import { InputField, Button, Avatar } from '~/ui'
import { colors } from '~/ui/theme'
import { Logo } from '~/ui/icons'

const SetupScreen = ({ navigation }) => {
  const { user, setUser } = useUser()
  const [validUsername, setValidUsername] = useState(false)

  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  const form = useForm({
    resolver: updateProfileResolver,
    reValidateMode: 'onSubmit',
  })

  const [username] = form.watch(['username'])

  const { mutate } = useMutation(validateUsername, {
    onSuccess: data => {
      setValidUsername(data.status)
      if (data?.status) {
        form.setError('username', {
          message: 'Your chosen username is one of a kind.',
        })
      } else {
        form.setError('username', {
          message: 'Username already taken.',
        })
      }
    },
    onError: data => {
      console.log(data?.msg)
    },
  })

  const { mutate: updateProfileMutate } = useMutation(updateProfile, {
    onSuccess: data => {
      setUser(data?.user, true)
      navigation.replace('Home')
    },
    onError: ({ data }) => {
      form.setError('username', { message: data?.msg })
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  useEffect(() => {
    form.setValue('first_name', user?.first_name || '')
    form.setValue('last_name', user?.last_name || '')
    form.setValue('username', user?.username || '')

    form.clearErrors()
  }, [isFocused])

  const onSubmit = input => {
    let hasError = false

    if (input.username && input.username !== user.username && !validUsername) {
      form.setError('username', { message: 'Username already taken.' })
      hasError = true
    }

    if (hasError) return

    setLoading(true)
    updateProfileMutate(input)
  }

  const checkUsername = useDebouncedCallback(async () => {
    setValidUsername(false)
    if (username.trim().length === 0) return
    mutate({ username })
  }, 500)

  useEffect(() => {
    checkUsername()
  }, [username])

  return (
    <FormProvider {...form}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.contentContainer}
          alwaysBounceVertical={false}
        >
          <Logo width="186" height="32" />

          <View>
            <View>
              <Text style={styles.maintitle}>Set up your{`\n`}profile</Text>
            </View>
            <View style={styles.avatar}>
              <Avatar size={128} />
            </View>
            <View style={styles.field}>
              <InputField
                name="first_name"
                placeholder="First name"
                autoCapitalize="none"
              />
              <InputField
                name="last_name"
                placeholder="Last name"
                autoCapitalize="none"
              />
              <InputField
                name="username"
                placeholder="Username"
                autoCapitalize="none"
                errorType={validUsername}
              />
              <View style={styles.action}>
                <Button
                  type="primary"
                  onPress={form.handleSubmit(onSubmit)}
                  textStyle={styles.btnText}
                  loading={loading}
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
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  maintitle: {
    fontWeight: '500',
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 45,
    marginTop: 20,
  },
  field: {
    marginTop: 40,
    gap: 20,
  },
  action: {
    marginVertical: 20,
  },
  btnText: {
    color: colors.white,
  },
  avatar: {
    marginTop: 40,
    alignItems: 'center',
  },
})

export default SetupScreen
