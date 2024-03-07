import {
  VIDEO_FILE_EXTENTION_ERROR,
  VIDEO_FILE_EXTENTION_ERROR_DESC,
  VIDEO_FILE_SIZE_ERROR,
  VIDEO_FILE_SIZE_ERROR_DESC,
  VIDEO_FILE_EXTENTION,
  ERROR_TEXT_FORMAT_FILE_NOT_SUPPORTED,
  VIDEO_MAX_SIZE_MB,
  IMAGE_MAX_SIZE_MB,
  IMAGE_FILE_EXTENTION,
  IMAGE_FILE_EXTENTION_ERROR,
  IMAGE_FILE_EXTENTION_ERROR_DESC,
  IMAGE_FILE_SIZE_ERROR,
  IMAGE_FILE_SIZE_ERROR_DESC,
} from '~/shared/types/AddMediaTypes'
import noop from '~/utils/noop'

const fileValidation = (file, mediaAddHandler = noop, setErrors) => {
  if (!file) return

  if (file?.errorCode === 'others') {
    setErrors({
      title: ERROR_TEXT_FORMAT_FILE_NOT_SUPPORTED,
      message: '',
    })
    return
  }

  const ext = file?.type?.split('/').pop()

  if (file?.type?.match('audio*')) {
    mediaAddHandler(file)
  } else if (file?.type?.match('video*')) {
    if (
      VIDEO_FILE_EXTENTION &&
      !VIDEO_FILE_EXTENTION.includes(ext.toLowerCase())
    ) {
      setErrors({
        title: VIDEO_FILE_EXTENTION_ERROR,
        message: VIDEO_FILE_EXTENTION_ERROR_DESC,
      })
      return
    }

    if (file.fileSize > VIDEO_MAX_SIZE_MB) {
      setErrors({
        title: VIDEO_FILE_SIZE_ERROR,
        message: VIDEO_FILE_SIZE_ERROR_DESC,
      })
      return
    }

    mediaAddHandler(file)
  } else if (file?.type?.match('image*')) {
    if (
      IMAGE_FILE_EXTENTION &&
      !IMAGE_FILE_EXTENTION.includes(ext.toLowerCase())
    ) {
      setErrors({
        title: IMAGE_FILE_EXTENTION_ERROR,
        message: IMAGE_FILE_EXTENTION_ERROR_DESC,
      })
      return
    }

    if (file.fileSize > IMAGE_MAX_SIZE_MB) {
      setErrors({
        title: IMAGE_FILE_SIZE_ERROR,
        message: IMAGE_FILE_SIZE_ERROR_DESC,
      })
      return
    }

    mediaAddHandler(file)
  }
}

export default fileValidation
