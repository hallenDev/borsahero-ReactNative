import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleHeader from '~/components/Headers/TitleHeader'
import ViewAllHeader from '~/components/ViewAllHeader'
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer'
import EditVideoModal from '~/components/Modals/EditVideoModal'
import DeleteVideoModal from '~/components/Modals/DeleteVideoModal'
import { useUser } from '~/context/UserContext'
import useViewContent from '~/hooks/useViewContent'
import ContentTypeMap from '~/shared/types/ContentTypeMap'
import { colors, text } from '~/ui/theme'
import { EyeOff } from '~/ui/icons'
import useDateTime from '~/utils/useDateTime'
import getReadableCount from '~/utils/getReadableCount'

const VideoDetailsScreen = ({ navigation, route }) => {
  const { user } = useUser()
  const { getPublishDate } = useDateTime()
  const onViewContent = useViewContent()
  const userId = route.params?.content?.user?.id
  const [content, setContent] = useState(route.params?.content)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const isPlayList = content.type === ContentTypeMap.PLAYLIST

  const files = content?.files || []
  useEffect(() => {
    setContent(route.params?.content)
    onViewContent(route.params?.content)
  }, [route])

  useEffect(() => {}, [content?.id])

  return (
    <>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.contentContainer}
        indicatorStyle="white"
      >
        <SafeAreaView edges={['bottom']}>
          <TitleHeader
            title={isPlayList ? 'Playlist details' : 'Video details'}
            onBack={() => navigation.goBack()}
          />

          {isPlayList && (
            <ViewAllHeader title="Playlists" actionTitle="View all" />
          )}

          <VideoPlayer
            video={content?.files[0]}
            containerStyle={!isPlayList && styles.mt20}
          />

          <Text style={styles.title}>
            {content?.title || content?.files?.[0]?.name}
          </Text>

          <View style={styles.subscribers}>
            <EyeOff width={20} height={20} color="#85FF3A" />
            <Text style={styles.subscriberText}>
              {getReadableCount(content?.view_count || 0)}
            </Text>
          </View>
          <Text style={styles.description}>
            {content?.description || content?.files?.[0]?.description}
          </Text>
          <Text style={styles.date}>
            Published {getPublishDate(content.created_at)}
          </Text>

          {user?.id === userId && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditModalVisible(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteBtn]}
                onPress={() => setDeleteModalVisible(true)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {files.length > 1 && (
            <>
              <Text style={styles.subTitle}>Next videos in playlist</Text>

              {files.map((file, key) =>
                key === 0 ? null : (
                  <VideoPlayer
                    key={key}
                    video={file}
                    containerStyle={styles.mt20}
                  />
                ),
              )}
            </>
          )}
        </SafeAreaView>
      </ScrollView>

      <EditVideoModal
        modalVisible={editModalVisible}
        content={content}
        onUpdated={setContent}
        onCloseModal={() => setEditModalVisible(false)}
      />

      <DeleteVideoModal
        content={content}
        modalVisible={deleteModalVisible}
        onDeleted={() => navigation.goBack()}
        onCloseModal={() => setDeleteModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginTop: 20,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    lineHeight: 23,
    marginTop: 20,
  },
  date: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 90,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  deleteBtn: {
    marginLeft: 20,
    backgroundColor: '#FF3535',
  },
  subscribers: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 100,
    backgroundColor: 'rgba(133, 255, 58, 0.1)',
    marginTop: 3,
  },
  subscriberText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: '#85FF3A',
    marginLeft: 3,
  },
  mt20: {
    marginTop: 20,
  },
  subTitle: {
    fontFamily: text.medium.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginTop: 40,
    marginBottom: 20,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})

export default VideoDetailsScreen
