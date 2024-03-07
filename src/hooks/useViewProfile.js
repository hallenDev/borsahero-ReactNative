import { useMutation, useQueryClient } from 'react-query'
import { viewUserProfile } from '~/shared/api/member'

const useViewProfile = () => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(viewUserProfile)

  return userId => {
    mutateAsync(userId)
      .then(data => {
        queryClient.setQueryData(['playlists', userId], playlists =>
          playlists?.map(playlist =>
            playlist?.user?.id === userId
              ? {
                  ...playlist,
                  user: {
                    ...playlist?.user,
                    view_count: data.view_count,
                  },
                }
              : playlist,
          ),
        )

        queryClient.setQueryData('popular-playlists', playlists =>
          playlists?.map(playlist =>
            playlist?.user?.id === userId
              ? {
                  ...playlist,
                  user: {
                    ...playlist?.user,
                    view_count: data.view_count,
                  },
                }
              : playlist,
          ),
        )
      })
      .catch(() => {})
  }
}

export default useViewProfile
