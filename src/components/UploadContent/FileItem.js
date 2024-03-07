import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import * as Progress from 'react-native-progress'
import { useMutation } from 'react-query'
import { onOpenLibrary } from '~/services/imagePickerService'
import {
  addVideo,
  updateVideo,
  deleteVideo,
  videoResolver,
} from '~/shared/api/member'
import { InputField, ErrorText } from '~/ui'
import { File, Close, EditVideo, UploadMedia } from '~/ui/icons'
import { colors, text } from '~/ui/theme'
import { Trash } from '~/ui/icons'
import uploadLargeFile from '~/utils/uploadLargeFile'
import getReadableFileSize from '~/utils/getReadableFileSize'
import noop from '~/utils/noop'

const FileItem = ({ file, isActive, onCompleted = noop, onDelete = noop }) => {
  const form = useForm({
    resolver: videoResolver,
    reValidateMode: 'onSubmit',
  })

  const [videoUrl, setVideoUrl] = useState('')
  const [videoKey, setVideoKey] = useState('')
  const [coverUpdated, setCoverUpdated] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [videoData, setVideoData] = useState({})

  const { mutate } = useMutation(addVideo, {
    onSuccess: data => {
      setVideoData(data)
      setIsEdit(false)
      setCoverUpdated(false)
      onCompleted(data?.id)
    },
    onError: ({ data }) => {
      // setError(data?.msg)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const { mutate: updateMutate } = useMutation(updateVideo, {
    onSuccess: data => {
      setVideoData(data)
      setIsEdit(false)
      setCoverUpdated(false)
    },
    onError: ({ data }) => {
      // setError(data?.msg)
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  const { mutate: deleteMutate } = useMutation(deleteVideo)

  const chooseCoverFile = () => {
    onOpenLibrary({
      onChange: files => {
        form.setValue('cover', files[0])
        form.trigger('cover')
      },

      mediaType: 'photo',
    })
  }

  const onSubmit = input => {
    if (loading) return

    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('video_url', videoUrl)
    formData.append('video_s3_key', videoKey)

    if (coverUpdated) {
      formData.append('file', {
        uri: input.cover.uri,
        type: input.cover.type,
        name: input.cover.fileName,
      })
    }
    setLoading(true)

    if (videoData?.id) {
      updateMutate({ id: videoData.id, formData: formData })
    } else {
      mutate(formData)
    }
  }

  const handleDeleteVideo = () => {
    if (videoData?.id) {
      deleteMutate(videoData?.id)
    }
    onDelete(videoData?.id)
  }

  useEffect(() => {
    const uploadFile = async () => {
      setUploading(true)
      uploadLargeFile(
        file,
        progress => setProgress(progress),
        (url, key) => {
          setIsEdit(true)
          setUploading(false)
          setVideoUrl(url)
          setVideoKey(key)
        },
        error => {
          console.log(error)
        },
      )
    }

    if (!videoUrl) {
      uploadFile()
    }
  }, [videoUrl])

  const [cover] = form.watch(['cover'])
  useEffect(() => {
    if (cover) {
      setCoverUpdated(true)
    }
  }, [cover])

  const coverError = form.formState.errors?.cover?.message

  return (
    <FormProvider {...form}>
      <View style={styles.container(isActive)}>
        <View style={styles.header}>
          <File width={24} height={24} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{videoData?.name || file?.fileName}</Text>
            <Text style={styles.desc(uploading)} numberOfLines={1}>
              {uploading
                ? `${Math.round(progress)}% Uploading  ${getReadableFileSize(
                    file.fileSize,
                  )}`
                : videoData?.description || 'Add description'}
            </Text>
            {uploading && (
              <Progress.Bar
                progress={progress / 100.0}
                width={200}
                color="#85FF3A"
                unfilledColor="rgba(255, 255, 255, 0.06)"
                borderWidth={0}
                style={styles.progressBar}
              />
            )}
          </View>
          {!isEdit && !uploading && (
            <TouchableOpacity onPress={() => setIsEdit(true)}>
              <EditVideo width={24} height={24} />
            </TouchableOpacity>
          )}

          {(uploading || isEdit) && (
            <TouchableOpacity
              style={styles.ml10}
              onPress={() => {
                if (uploading) {
                  onDelete(videoData?.id)
                } else {
                  setIsEdit(false)
                }
              }}
            >
              <Close width={24} height={24} />
            </TouchableOpacity>
          )}
        </View>

        {isEdit && (
          <View style={styles.editContainer}>
            <InputField
              name="name"
              placeholder="Name"
              autoCapitalize="none"
              style={styles.nameField}
              defaultValue={videoData?.name}
            />

            <InputField
              name="description"
              placeholder="Description"
              multiline
              maxLength={1024}
              containerStyle={styles.description}
              defaultValue={videoData?.description}
            />

            <View style={styles.dropzone(!!coverError)}>
              {cover ? (
                <>
                  <Image source={cover} style={styles.coverImage} />
                  <TouchableOpacity
                    style={styles.trashBtn}
                    onPress={() => form.setValue('cover', null)}
                  >
                    <Trash width={24} height={24} color={colors.white} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={chooseCoverFile}>
                    <UploadMedia width={45} height={45} />
                  </TouchableOpacity>
                  <Text style={[styles.name, styles.mt10]}>Uplaod cover</Text>
                </>
              )}
            </View>

            <ErrorText error={coverError} />

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeleteVideo}
              >
                <Text style={styles.name}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ml10, styles.button, styles.primary]}
                onPress={form.handleSubmit(onSubmit)}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.name}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: isActive => ({
    backgroundColor: isActive ? 'black' : '#222222',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  }),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flexShrink: 1,
    flexGrow: 1,
    marginHorizontal: 5,
  },
  name: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  desc: uploading => ({
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: uploading ? '#946EFF' : 'rgba(255, 255, 255, 0.4)',
    marginTop: 3,
  }),
  progressBar: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  mt10: {
    marginTop: 10,
  },
  editContainer: {
    marginTop: 20,
    gap: 15,
  },
  description: {
    height: 80,
    borderRadius: 16,
  },
  dropzone: error => ({
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: error ? '#FF3535' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    alignItems: 'center',
    aspectRatio: 1.8,
    justifyContent: 'center',
    overflow: 'hidden',
  }),
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    minWidth: 90,
    alignItems: 'center',
    minHeight: 35,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#6E3AFF',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    resizeMode: 'cover',
  },
  trashBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 12,
  },
})

export default FileItem
