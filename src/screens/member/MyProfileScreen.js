import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleHeader from '~/components/Headers/TitleHeader'
import UserMainInfo from '~/components/User/UserMainInfo'
import Playlists from '~/components/Playlists/Playlists'
import StreamersOfDay from '~/components/StreamersOfDay/StreamersOfDay'
import useProfile from '~/hooks/useProfile'
import { getPlaylists, getVideos } from '~/shared/api/member'

const MyProfileScreen = ({ navigation }) => {
  const { data: user } = useProfile()

  const { data: videos = [] } = useQuery(['videos', user?.id], () =>
    getVideos(),
  )
  const { data: playlists = [] } = useQuery(['playlists', user?.id], () =>
    getPlaylists(),
  )

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView edges={['bottom']}>
        <TitleHeader title="My profile" onBack={() => navigation.goBack()} />

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

export default MyProfileScreen
