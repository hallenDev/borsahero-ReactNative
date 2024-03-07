import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { colors, text } from '~/ui/theme'

const TabBar = ({
  tabs = [],
  selectedIndex,
  onChange,
  style,
  containerStyle,
  title,
}) => (
  <View style={style}>
    {title && <Text style={styles.title}>{title}</Text>}
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab(selectedIndex === index)}
          onPress={() => onChange(index)}
        >
          <Text style={styles.tabTitle(selectedIndex === index)}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tab: active => ({
    backgroundColor: active ? 'rgba(110, 58, 255, 0.1)' : 'transparent',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: active ? '#6E3AFF' : 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 3,
  }),
  tabTitle: active => ({
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: active ? '#946EFF' : 'rgba(255, 255, 255, 0.4)',
  }),
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginBottom: 10,
  },
})

export default TabBar
