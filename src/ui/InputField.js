import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'

import { ErrorText, AcceptText } from '~/ui'
import { Eye, EyeOff } from '~/ui/icons'
import { typography, colors, text } from '~/ui/theme'

const InputElement = (
  {
    description,
    error = '',
    errorShow = true,
    errorType = false,
    secureTextEntry,
    style,
    inputStyle,
    containerStyle,
    hideCounter,
    ...props
  },
  ref,
) => {
  const [secure, setSecure] = useState(secureTextEntry)

  return (
    <View style={[styles.wrapper, style]}>
      {description && (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          containerStyle,
          error && !errorType && styles.error,
        ]}
      >
        <TextInput
          ref={ref}
          secureTextEntry={secure}
          {...props}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.text_secondary}
          style={[styles.input(props.multiline), inputStyle]}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setSecure(!secure)} style={styles.secure}>
            {secure ? (
              <EyeOff style={styles.secureIcon} />
            ) : (
              <Eye style={styles.secureIcon} />
            )}
          </Pressable>
        )}
      </View>
      {props.maxLength && !hideCounter && (
        <Text style={styles.lengthCounter}>
          {`${(props.value ?? '').length}/${props.maxLength}`}
        </Text>
      )}
      {error != '' && errorShow && !errorType && <ErrorText error={error} />}
      {error != '' && errorShow && errorType && <AcceptText text={error} />}
    </View>
  )
}

export const Input = forwardRef(InputElement)

const InputField = ({ defaultValue = '', name, ...props }) => {
  const form = useFormContext()

  useEffect(() => {
    form.setValue(name, defaultValue)
  }, [])

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <Input
          {...field}
          {...props}
          onChangeText={v => {
            onChange(v)
            if (form.formState.errors[name]?.message) {
              form.trigger(name)
            }
            if (props.change) {
              props.change(name, v)
            }
          }}
          error={form.formState.errors[name]?.message}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  container: {
    backgroundColor: '#222222',
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border_primary,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  error: {
    borderColor: colors.destructive_red,
  },
  input: (multiline = false) => ({
    ...typography.p2,
    color: colors.white,
    lineHeight: 18,
    flex: 1,
    textAlignVertical: multiline ? 'top' : 'center',
    height: '100%',
  }),
  description: { marginBottom: 0 },
  descriptionText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.textMain,
  },
  secure: {},
  secureIcon: {
    color: colors.white,
  },
  lengthCounter: {
    ...typography.c3,
    color: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'flex-end',
    fontSize: 14,
  },
})

export default InputField
