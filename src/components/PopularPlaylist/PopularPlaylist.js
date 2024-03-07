import React from 'react'
import { StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import { getPopularPlaylists } from '~/shared/api/member'
import { colors, typography, text } from '~/ui/theme'
import Playlists from '../Playlists/Playlists'

const PopularPlaylist = () => {
  const { data = [] } = useQuery('popular-playlists', getPopularPlaylists)

  return <Playlists playlists={data} />
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

export default PopularPlaylist
