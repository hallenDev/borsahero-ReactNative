import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import TitleHeader from '~/components/Headers/TitleHeader'
import UserMainInfo from '~/components/User/UserMainInfo'
import Playlists from '~/components/Playlists/Playlists'
import StreamersOfDay from '~/components/StreamersOfDay/StreamersOfDay'
import useProfile from '~/hooks/useProfile'
import useViewProfile from '~/hooks/useViewProfile'
import { getPlaylists, getVideos } from '~/shared/api/member'

const UserProfileScreen = ({ navigation, route }) => {
  const { user: otherUser } = route.params || {}
  const { data: user } = useProfile(otherUser?.id)
  const isFocused = useIsFocused()

  const onViewProfile = useViewProfile()

  const { data: videos = [] } = useQuery(['videos', otherUser?.id], () =>
    getVideos(otherUser?.id),
  )
  const { data: playlists = [] } = useQuery(['playlists', otherUser?.id], () =>
    getPlaylists(otherUser?.id),
  )

  useEffect(() => {
    if (isFocused) {
      onViewProfile(otherUser?.id)
    }
  }, [isFocused, otherUser?.id])

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView edges={['bottom']}>
        <TitleHeader title="User profile" onBack={() => navigation.goBack()} />

        <UserMainInfo user={user} />

        {videos.length > 0 && <StreamersOfDay title="Videos" videos={videos} />}

        {playlists.length > 0 && (
          <Playlists title="Playlists" playlists={playlists} />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})

export default UserProfileScreen
