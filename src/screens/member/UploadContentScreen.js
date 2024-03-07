import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NestableScrollContainer } from 'react-native-draggable-flatlist'
import { useMutation, useQueryClient } from 'react-query'
import TitleHeader from '~/components/Headers/TitleHeader'
import Files from '~/components/UploadContent/Files'
import { contentUploadResolver, uploadContent } from '~/shared/api/member'
import { InputField, Button, Dropdown, TabBar } from '~/ui'
import { colors, text } from '~/ui/theme'
import ContentTypeMap from '~/shared/types/ContentTypeMap'
import MarketMap from '~/shared/types/MarketMap'

const contentTypes = [
  {
    label: 'Playlist',
    value: ContentTypeMap.PLAYLIST,
  },
  {
    label: 'Video',
    value: ContentTypeMap.VIDEO,
  },
]

const markets = Object.keys(MarketMap).map(key => ({
  label: MarketMap[key],
  value: key,
}))

const UploadContentScreen = ({ navigation }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: contentUploadResolver,
    reValidateMode: 'onSubmit',
  })

  const [loading, setLoading] = useState(false)
  const [contentType, setContentType] = useState('paid')
  const filesRef = useRef()
  const [type] = form.watch(['type'])

  const isFocused = useIsFocused()

  const { mutate } = useMutation(uploadContent, {
    onSuccess: data => {
      queryClient.invalidateQueries('videos')
      queryClient.invalidateQueries('playlists')
      queryClient.invalidateQueries('popular-playlists')
      navigation.goBack()
    },
    onError: ({ data }) => {},
    onSettled: _ => {
      setLoading(false)
    },
  })

  const onSubmit = input => {
    if (!filesRef.current?.hasCompletedVideoForms()) {
      toast.show('', {
        type: 'notification',
        data: {
          title: 'Please complete all the video forms',
          error: true,
        },
      })
      return
    }

    setLoading(true)
    mutate({
      type: input.type.value,
      market: input.market.value,
      title: input.title,
      description: input.description,
      files: input.files,
      content_type: contentType,
    })
  }

  useEffect(() => {
    if (!isFocused) {
      form.reset()
      form.clearErrors()
      form.setValue('files', [])
    }
  }, [isFocused])

  useEffect(() => {
    form.setValue('files', [])
  }, [])

  return (
    <FormProvider {...form}>
      <NestableScrollContainer
        style={styles.flex}
        contentContainerStyle={styles.contentContainer}
        indicatorStyle="white"
      >
        <SafeAreaView edges={['bottom']}>
          <TitleHeader
            title="Upload content"
            onBack={() => navigation.goBack()}
          />
          <Text style={styles.title}>Content info</Text>
          <Dropdown
            name="type"
            title="Content type"
            data={contentTypes}
            style={styles.mt20}
          />

          <Dropdown
            name="market"
            title="Market"
            data={markets}
            style={styles.mt20}
          />

          {type?.value === ContentTypeMap.PLAYLIST && (
            <InputField
              name="title"
              description="Title"
              autoCapitalize="none"
              style={styles.mt20}
              error={form.formState.errors?.title?.message}
            />
          )}

          <TabBar
            title="Content type"
            tabs={['Paid', 'Free']}
            selectedIndex={contentType === 'paid' ? 0 : 1}
            style={styles.mt20}
            onChange={index => setContentType(index === 0 ? 'paid' : 'free')}
          />

          {type?.value === 'playlist' && (
            <InputField
              name="description"
              description="Description"
              multiline
              maxLength={1024}
              style={styles.mt20}
              containerStyle={styles.description}
              error={form.formState.errors?.description?.message}
            />
          )}

          <Files ref={filesRef} type={type?.value} style={styles.mt20} />
          <View style={styles.actions}>
            <Button
              type="white"
              style={styles.flex}
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={styles.flex}
              loading={loading}
              onPress={form.handleSubmit(onSubmit)}
            >
              Upload
            </Button>
          </View>
        </SafeAreaView>
      </NestableScrollContainer>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginTop: 15,
  },
  description: {
    height: 100,
    borderRadius: 16,
    paddingVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 20,
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})

export default UploadContentScreen
