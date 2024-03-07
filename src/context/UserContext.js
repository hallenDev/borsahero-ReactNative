import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useQueryClient } from 'react-query'
import useAxiosConfig from '~/hooks/useAxiosConfig'
import useStorage from '~/hooks/useStorage'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isSignedIn, setIsSignedIn] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const { userStore, setUserStore, authToken, setAuthToken, removeAuthToken } =
    useStorage()

  const hasProfileInfo = useCallback(() => {
    return user?.first_name && user?.last_name && user?.username && user?.avatar
  }, [user])

  const updateUser = useCallback((user, onlyUserInfo = false) => {
    setUserStore(user)
    setUser(user)

    if (!onlyUserInfo) {
      setAuthToken(user?.accessToken)
      setIsSignedIn(!!user?.accessToken)
    }
  }, [])

  const logout = useCallback(() => {
    setUserStore(null)
    setUser(null)
    removeAuthToken()
    setIsSignedIn(false)

    queryClient.clear()
  }, [])

  useEffect(() => {
    const restoreState = async () => {
      setUser(userStore)
      setIsSignedIn(!!authToken)
      setIsReady(true)
      setLoading(false)
    }

    if (!isReady) {
      restoreState()
    }
  }, [authToken, isReady, userStore])

  const userContext = useMemo(
    () => ({
      user,
      setUser: updateUser,
      isSignedIn,
      logout,
      hasProfileInfo,
    }),
    [setUser, user, isSignedIn],
  )

  useAxiosConfig()

  if (loading) return null

  return (
    <UserContext.Provider
      value={{
        ...userContext,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext')
  }
  return context
}

export { useUser }

export default UserProvider
