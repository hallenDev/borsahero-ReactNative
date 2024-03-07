import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useToast } from 'react-native-toast-notifications'
import { StyleSheet, View } from 'react-native'
import { useMutation } from 'react-query'
import { useUser } from '~/context/UserContext'
import { InputField, Button, Avatar, ErrorText } from '~/ui'
import { updateProfileResolver, updateProfile } from '~/shared/api/member'

const UserInfoEdit = () => {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const form = useForm({
    resolver: updateProfileResolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate } = useMutation(updateProfile, {
    onSuccess: data => {
      setUser(data?.user, true)

      toast.show('', {
        type: 'notification',
        data: {
          title: 'Your profile information was updated successfully.',
        },
      })
    },
    onError: ({ data }) => {
      console.log(data?.msg)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const onCancel = () => {
    form.clearErrors()

    form.setValue('first_name', user?.first_name)
    form.setValue('last_name', user?.last_name)
    form.setValue('username', user?.username)
    form.setValue('bio', user?.bio)
  }

  const onSubmit = input => {
    setLoading(true)
    mutate(input)
  }

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <Avatar size={128} />

        <View style={styles.row}>
          <InputField
            name="first_name"
            placeholder="First name"
            autoComplete="name-family"
            autoCapitalize="none"
            style={styles.nameField}
            defaultValue={user?.first_name}
            errorShow={false}
          />

          <InputField
            name="last_name"
            placeholder="Last name"
            autoComplete="name-given"
            autoCapitalize="none"
            style={styles.nameField}
            defaultValue={user?.last_name}
          />
        </View>

        {(form.formState.errors?.first_name?.message ||
          form.formState.errors?.last_name?.message) && (
          <ErrorText error="First name and last name are required fields" />
        )}

        <InputField
          name="username"
          placeholder="Username"
          autoComplete="username"
          autoCapitalize="none"
          defaultValue={user?.username}
        />

        <InputField
          name="bio"
          placeholder="Describe yourself"
          multiline
          maxLength={1024}
          containerStyle={styles.bio}
          defaultValue={user?.bio}
        />

        <View style={styles.actions}>
          <Button type="white" style={styles.flex} onPress={onCancel}>
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
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#222222',
    marginTop: 20,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  bio: {
    height: 160,
    textAlignVertical: 'top',
    alignItems: 'flex-start',
    borderRadius: 16,
    paddingVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
  },
  flex: {
    flex: 1,
  },
  nameField: {
    flex: 1,
  },
})
export default UserInfoEdit
