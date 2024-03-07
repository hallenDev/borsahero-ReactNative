import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors, text } from '~/ui/theme'
import SearchField from '~/ui/SearchField'
import TabBar from '~/ui/TabBar'

const SubscriptionsFilter = ({ filter, onChange }) => {
  const selectedIndex = filter?.option === 'paid' ? 0 : 1

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My subscriptions</Text>
      <SearchField />

      <TabBar
        tabs={['Paid']}
        selectedIndex={selectedIndex}
        containerStyle={styles.tabBar}
        onChange={index =>
          onChange({
            ...filter,
            option: index === 0 ? 'paid' : 'free',
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginBottom: 20,
  },
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  tabBar: {
    marginTop: 20,
  },
})

export default SubscriptionsFilter
