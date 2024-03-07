import { useMutation } from 'react-query'
import { viewVideo } from '~/shared/api/member'

const useViewVideo = () => {
  const { mutateAsync } = useMutation(viewVideo)

  return video => {
    mutateAsync(video.id)
      .then(() => {})
      .catch(() => {})
  }
}

export default useViewVideo
