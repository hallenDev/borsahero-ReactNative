import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { resetPassword, resetPassResolver } from '~/shared/api'
import { InputField, Button } from '~/ui'
import { colors } from '~/ui/theme'
import { Logo } from '~/ui/icons'

const NewPasswordScreen = ({ navigation, route }) => {
  const { email, otpCode } = route.params || {}
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: resetPassResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(resetPassword, {
    onSuccess: _ => {
      navigation.navigate('LoginScreen')
    },
    onError: error => {
      console.log(error)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const onSubmit = input => {
    setLoading(true)
    mutate({
      email,
      password: input.password,
      otpCode,
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
          <Logo width="186" height="32" />

          <View style={styles.mainWrapper}>
            <View style={styles.title}>
              <Text style={styles.maintitle}>Set up new{`\n`}password</Text>
            </View>
            <View style={styles.field}>
              <InputField
                name="password"
                placeholder="New password"
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <InputField
                name="confirmpassword"
                placeholder="Confirm password"
                autoCapitalize="none"
                secureTextEntry={true}
              />
              <View style={styles.action}>
                <Button
                  type="primary"
                  loading={loading}
                  onPress={form.handleSubmit(onSubmit)}
                  textStyle={styles.btnText}
                >
                  Save
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
  contentContainer: {
    padding: 20,
    minHeight: '100%',
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  centerwrapper: {
    flex: 1,
    gap: 40,
    marginTop: 30,
  },
  maintitle: {
    fontWeight: '500',
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 44,
  },
  field: {
    marginTop: 40,
    gap: 20,
  },
  action: {},
  btnText: {
    color: colors.white,
  },
  avatar: {
    alignItems: 'center',
  },
})

export default NewPasswordScreen
