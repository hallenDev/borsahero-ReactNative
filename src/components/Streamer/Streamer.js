import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import LiveElem from './Live'
import UserInfo from './UserInfo'
import FreePaidItem from '../FreePaidItem'
import SubscribeButton from './SubscribeButton'
import UnlockContentModal from '~/components/Modals/UnlockContentModal'
import ContentTypeMap from '~/shared/types/ContentTypeMap'
import MarketMap from '~/shared/types/MarketMap'
import { colors, typography } from '~/ui/theme'
import noop from '~/utils/noop'

const Streamer = ({
  content,
  isLive = true,
  isFullWidth = false,
  showUserInfo = true,
  showOptions = true,
  onPress = noop,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const isFree = content?.content_type === 'free'
  const shouldSubscribe = content?.shouldSubscribe

  const handlePress = () => {
    if (shouldSubscribe) {
      setModalVisible(true)
      return
    }
    !!onPress && onPress()
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container(isFullWidth)}
        onPress={handlePress}
      >
        <FastImage
          style={styles.background}
          source={{ uri: content?.files[0].poster_url }}
          resizeMode="cover"
        />

        <View style={styles.top}>
          {isLive ? (
            <LiveElem viewCount={content?.view_count} />
          ) : (
            <View style={styles.titleHeader}>
              <Text style={styles.title}>
                {content.type === ContentTypeMap.VIDEO
                  ? content.files[0].title
                  : content.title}
              </Text>
              <Text style={styles.subTitle}>10k bought</Text>
            </View>
          )}
          <View style={styles.row}>
            {showOptions && (
              <Text style={styles.options}>{MarketMap[content?.market]}</Text>
            )}
            <FreePaidItem isFree={isFree} style={styles.ml8} />
          </View>
        </View>

        <View style={styles.bottom}>
          {showUserInfo ? (
            <UserInfo
              user={content?.user}
              showSubscribe={content?.content_type === 'paid'}
            />
          ) : (
            <View />
          )}

          {shouldSubscribe && <SubscribeButton onPress={handlePress} />}
        </View>
      </TouchableOpacity>

      {modalVisible && (
        <UnlockContentModal
          user={content?.user}
          modalVisible={modalVisible}
          onCloseModal={() => setModalVisible(false)}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: isFullWidth => ({
    width: isFullWidth ? '100%' : Dimensions.get('window').width * 0.8,
    aspectRatio: 1.5,
    borderRadius: 24,
    justifyContent: 'space-between',
  }),
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    opacity: 0.5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  bottom: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options: {
    ...typography.p1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  free: {
    ...typography.p1,
    fontSize: 12,
    lineHeight: 18,
    color: '#85FF3A',
    borderWidth: 1,
    borderColor: '#85FF3A',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 8,
    height: 20,
  },
  titleHeader: {
    flexShrink: 1,
    marginRight: 10,
  },
  title: {
    ...typography.p3,
    fontSize: 14,
    color: colors.white,
  },
  subTitle: {
    ...typography.p3,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  ml8: {
    marginLeft: 8,
  },
})

export default Streamer
