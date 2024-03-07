import React from 'react'
import { StyleSheet, View } from 'react-native'
import GoLiveButton from './GoLiveButton'
import ProfileMenu from './ProfileMenu'
import NotificationMenu from './NotificationMenu'
import CollapsableSearchField from './CollapsableSearchField'

const DiscoverHeader = () => (
  <View style={styles.container}>
    <GoLiveButton />
    <CollapsableSearchField />
    <View style={styles.row}>
      <NotificationMenu />
      <ProfileMenu />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default DiscoverHeader
