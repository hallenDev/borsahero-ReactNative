import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Search } from '~/ui/icons'
import { colors, text } from '~/ui/theme'
import SearchField from '~/ui/SearchField'

const CollapsableSearchField = () => {
  const [isEdit, setIsEdit] = useState(false)

  return isEdit ? (
    <SearchField
      containerStyle={styles.editContainer}
      onClose={() => setIsEdit(b => !b)}
    />
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsEdit(b => !b)}
    >
      <View style={styles.iconWrap}>
        <Search width={16} height={16} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    position: 'absolute',
    width: '100%',
    left: 20,
    borderColor: '#6E3AFF',
    borderWidth: 2,
    height: 40,
    zIndex: 1,
  },
  iconWrap: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 13,
  },
  input: {
    fontFamily: text.regular.fontFamily,
    flexGrow: 1,
    color: colors.white,
    marginHorizontal: 10,
  },
})
export default CollapsableSearchField
