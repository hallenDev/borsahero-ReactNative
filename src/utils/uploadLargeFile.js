import { Platform } from 'react-native'
import RNFS from 'react-native-fs'
import { initiateUpload, uploadFile, completeUpload } from '~/shared/api/member'
import noop from '~/utils/noop'

const CHUNK_SIZE = 1024 * 1024 * 5

const uploadLargeFile = async (
  file,
  onProgress = noop,
  onCompleted = noop,
  onError = noop,
) => {
  try {
    const response = await initiateUpload({ fileName: file.fileName })

    const { tempId, uploadId } = response

    let url = decodeURIComponent(
      Platform.OS === 'ios' ? file.uri : file.uri.replace('file://', ''),
    )

    const { size } = await RNFS.stat(url)

    const totalChunks = Math.ceil(size / CHUNK_SIZE)

    let uploadedChunks = 0
    const uploadPromises = []

    let start = 0
    let end
    for (let i = 0; i < totalChunks; i++) {
      end = start + CHUNK_SIZE
      const data = await RNFS.read(
        url,
        Math.min(CHUNK_SIZE, size - start),
        start,
        'base64',
      )

      const uploadPromise = uploadFile({
        index: i,
        fileName: file.fileName,
        uploadId,
        tempId,
        file: data,
      }).then(() => {
        uploadedChunks++
        console.log(uploadedChunks, 'upoadedChunks')
        const progress = Math.floor((uploadedChunks / totalChunks) * 100)
        onProgress(progress)
      })

      uploadPromises.push(uploadPromise)
      start = end
    }

    await Promise.all(uploadPromises)

    const completedResponse = await completeUpload({
      uploadId,
      tempId,
      fileName: file.fileName,
    })

    onCompleted(completedResponse.data, completedResponse.key)
  } catch (error) {
    onError(error)
  }
}

export default uploadLargeFile
