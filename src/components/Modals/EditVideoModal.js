import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useMutation, useQueryClient } from 'react-query'
import { contentEditResolver, updateContent } from '~/shared/api/member'
import ContentTypeMap from '~/shared/types/ContentTypeMap'
import { InputField, Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'
import noop from '~/utils/noop'

const EditVideoModal = ({
  content,
  modalVisible,
  onUpdated = noop,
  onCloseModal = noop,
}) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const form = useForm({
    resolver: contentEditResolver,
    reValidateMode: 'onSubmit',
  })
  const [name, description] = form.watch(['name', 'description'])
  const [loading, setLoading] = useState(false)

  const isPlayList = content.type === ContentTypeMap.PLAYLIST

  const { mutate } = useMutation(updateContent, {
    onSuccess: _ => {
      if (isPlayList) {
        queryClient.setQueryData(['playlists', content?.user?.id], contents =>
          contents?.map(c =>
            c.id === content.id ? { ...c, title: name, description } : c,
          ),
        )

        queryClient.invalidateQueries('popular-playlists')

        onUpdated({
          ...content,
          title: name,
          description,
        })
      } else {
        queryClient.setQueryData(['videos', content?.user?.id], contents =>
          contents?.map(c =>
            c.id === content.id
              ? {
                  ...c,
                  files: c.files.map(file =>
                    file.id === content.files[0].id
                      ? { ...file, name, description }
                      : file,
                  ),
                }
              : c,
          ),
        )

        onUpdated({
          ...content,
          files: [{ ...content.files[0], name, description }],
        })
      }

      onCloseModal()
    },
    onError: ({ data }) => {
      onCloseModal()
      toast.show('', {
        type: 'notification',
        data: { title: data?.msg, error: true },
      })
    },
    onSettled: _ => {
      setLoading(false)
    },
  })

  useEffect(() => {
    if (modalVisible) {
      form.clearErrors()
    }
  }, [modalVisible])

  const onSubmit = input => {
    Keyboard.dismiss()
    setLoading(true)

    input.id = content.id
    mutate(input)
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <FormProvider {...form}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Edit Video</Text>

            <InputField
              name="name"
              placeholder="Name"
              autoCapitalize="none"
              defaultValue={isPlayList ? content.title : content.files[0].name}
            />

            <InputField
              name="description"
              placeholder="Description"
              multiline
              maxLength={1024}
              containerStyle={styles.description}
              defaultValue={
                isPlayList ? content.description : content.files[0].description
              }
              errorShow={false}
            />

            <View style={styles.row}>
              <Button type="white" style={styles.flex} onPress={onCloseModal}>
                Cancel
              </Button>
              <Button
                type="primary"
                style={styles.flex}
                loading={loading}
                onPress={form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onCloseModal}>
              <Close width={16} height={16} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </FormProvider>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#141414',
    padding: 25,
    borderRadius: 30,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 0,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  flex: {
    flex: 1,
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
    alignItems: 'flex-start',
    borderRadius: 16,
    paddingVertical: 5,
  },
})

export default EditVideoModal
