import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { Close, Search } from '~/ui/icons'
import { colors, text } from '~/ui/theme'

const SearchField = ({ containerStyle, onClose }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Search width={16} height={16} color={colors.white} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
      />
      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <Close width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.surface_primary,
    zIndex: 1,
  },
  input: {
    fontFamily: text.regular.fontFamily,
    flexGrow: 1,
    color: colors.white,
    marginHorizontal: 10,
  },
})

export default SearchField
