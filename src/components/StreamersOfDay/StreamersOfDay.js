import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Streamer from '~/components/Streamer/Streamer'
import ViewAllHeader from '~/components/ViewAllHeader'
import { colors, typography, text } from '~/ui/theme'

const StreamersOfDay = ({ title, videos = [] }) => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <Streamer
      content={item}
      showUserInfo={false}
      onPress={() => {
        navigation.navigate('VideoDetails', { content: item })
      }}
    />
  )

  return (
    <View>
      <ViewAllHeader
        title={title || 'Stream of the day'}
        actionTitle="View all"
      />
      <FlatList
        data={videos}
        renderItem={renderItem}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 20,
    color: colors.white,
    flexShrink: 1,
  },
  buttonText: {
    ...typography.p1,
    fontSize: 16,
    color: '#85FF3A',
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: 'rgba(133, 255, 58, 0.1)',
    borderRadius: 20,
  },
  list: {
    marginHorizontal: -20,
  },
  contentContainer: {
    gap: 20,
    paddingHorizontal: 20,
  },
})

export default StreamersOfDay
