import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import TabBarIcon from '~/components/TabBarIcon'
import Streamer from '~/components/Streamer/Streamer'
import PopularPlaylist from '~/components/PopularPlaylist/PopularPlaylist'
import StreamersOfDay from '~/components/StreamersOfDay/StreamersOfDay'
import { Discover } from '~/ui/icons'
import { colors, text, typography } from '~/ui/theme'

const DiscoverScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Trade, earn{`\n`}money, follow{`\n`}popular{`\n`}streamers
      </Text>

      <Text style={styles.description}>
        Watch trading titans and become one of them
      </Text>

      <Streamer isFullWidth onSubscribe={() => {}} />

      <PopularPlaylist />

      <StreamersOfDay />
    </ScrollView>
  )
}

export const options = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: props => <TabBarIcon {...props} Icon={Discover} />,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontFamily: text.semiBold.fontFamily,
    color: colors.white,
    fontSize: 40,
    lineHeight: 50,
  },
  description: {
    ...typography.p1,
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 15,
  },
})

export default DiscoverScreen
