import { useQuery } from 'react-query'
import { useUser } from '~/context/UserContext'
import { fetchProfile } from '~/shared/api/member'

const useProfile = id => {
  const { user, setUser } = useUser()
  const userId = id ?? user.id
  const isMe = user.id === userId

  const { data = isMe ? user : {}, ...rest } = useQuery(
    ['profile', userId],
    () => fetchProfile(userId),
    {
      onSuccess: resp => {
        if (isMe) {
          setUser(
            {
              ...user,
              ...resp,
            },
            true,
          )
        }
      },
    },
  )

  return { data, ...rest }
}

export default useProfile
