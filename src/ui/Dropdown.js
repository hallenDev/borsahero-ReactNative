import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { ErrorText } from '~/ui'
import { colors, text } from '~/ui/theme'

const DropdownElement = ({ name, title, data = [], style, defaultValue }) => {
  const form = useFormContext()

  const renderItem = (item, selected) => {
    return (
      <Text
        style={[
          styles.itemTextStyle,
          selected && { backgroundColor: '#6E3AFF' },
        ]}
      >
        {item.label}
      </Text>
    )
  }

  useEffect(() => {
    form.setValue(name, defaultValue)
  }, [])

  const error = form.formState.errors[name]?.message

  return (
    <View style={style}>
      <Text style={[styles.text, styles.mb5]}>{title}</Text>
      <Controller
        name={name}
        render={({ field: { onChange, ref, ...field } }) => (
          <Dropdown
            {...field}
            style={styles.dropdown(!!error)}
            selectedTextStyle={styles.text}
            iconStyle={styles.iconStyle}
            containerStyle={styles.containerStyle}
            activeColor="rgba(255, 255, 255, 0.1)"
            renderItem={renderItem}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=""
            onChange={v => {
              onChange(v)

              if (error) {
                form.trigger(name)
              }
            }}
          />
        )}
      />

      <ErrorText error={error} style={styles.mt5} />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: error => ({
    borderWidth: 1,
    borderRadius: 100,
    borderColor: error ? '#FF3535' : 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 15,
    height: 40,
  }),
  text: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  mb5: {
    marginBottom: 5,
  },
  iconStyle: {
    tintColor: colors.white,
  },
  containerStyle: {
    backgroundColor: '#222222',
    borderRadius: 16,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemTextStyle: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  mt5: {
    marginTop: 5,
  },
})

export default DropdownElement
