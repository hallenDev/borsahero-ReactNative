import { useIsFocused } from '@react-navigation/native'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import uuid from 'react-native-uuid'
import { useToast } from 'react-native-toast-notifications'
import {
  NestableDraggableFlatList,
  ShadowDecorator,
} from 'react-native-draggable-flatlist'
import NoFiles from './NoFiles'
import FileItem from './FileItem'
import { onOpenLibrary } from '~/services/imagePickerService'
import { colors, text } from '~/ui/theme'
import { ErrorText } from '~/ui'
import { Upload } from '~/ui/icons'
import fileValidation from '~/utils/fileValidation'

const Files = ({ type, style }, ref) => {
  const toast = useToast()
  const form = useFormContext()
  const isFocused = useIsFocused()
  const [drafts, setDrafts] = useState([])
  const [files = []] = form.watch(['files'])

  useImperativeHandle(ref, () => ({
    hasCompletedVideoForms: () => files.length === drafts.length,
  }))

  const onChange = files => {
    fileValidation(
      files[0],
      () => {
        setDrafts(_drafts => [..._drafts, { ...files[0], id: uuid.v4() }])
      },
      ({ title, message }) => {
        toast.show('', {
          type: 'notification',
          data: { title, message, error: true },
        })
      },
    )
  }

  const chooseVideoFile = () => {
    if (files.length !== drafts.length) {
      toast.show('', {
        type: 'notification',
        data: { title: 'Please complete the previous forms.' },
      })
      return
    }

    onOpenLibrary({
      onChange,
      mediaType: 'video',
    })
  }

  const keyExtractor = file => file.id

  const renderItem = ({ item: file, drag, isActive }) => (
    <ShadowDecorator>
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
        <FileItem
          file={file}
          isActive={isActive}
          onDelete={() =>
            setDrafts(_drafts => _drafts.filter(draft => draft.id !== file.id))
          }
          onCompleted={videoId =>
            setDrafts(_drafts =>
              _drafts.map(draft =>
                draft.id === file.id ? { ...draft, videoId: videoId } : draft,
              ),
            )
          }
        />
      </TouchableOpacity>
    </ShadowDecorator>
  )

  useEffect(() => {
    const _files = drafts
      .filter(draft => draft.videoId)
      .map(draft => draft.videoId)
    form.setValue('files', _files)

    if (form.formState.errors?.files?.message && _files > 0) {
      form.trigger('files')
    }
  }, [form.formState.errors?.files?.message, drafts])

  useEffect(() => {
    if (!isFocused) {
      setDrafts([])
    }
  }, [isFocused])

  const error = form.formState.errors?.files?.message

  return (
    <View style={style}>
      <Text style={styles.title}>Files</Text>
      {drafts.length === 0 ? (
        <NoFiles error={error} onPress={chooseVideoFile} />
      ) : (
        <>
          <NestableDraggableFlatList
            data={drafts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onDragEnd={({ data }) => setDrafts(data)}
          />

          {type === 'playlist' && (
            <TouchableOpacity
              style={styles.uploadMore}
              onPress={chooseVideoFile}
            >
              <Upload width={21} height={21} />
              <Text style={styles.uploadText}>Upload more</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <ErrorText error={error} style={styles.mt10} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  uploadMore: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: '#946EFF',
    marginLeft: 5,
  },
  mt10: {
    marginTop: 10,
  },
})

export default forwardRef(Files)
