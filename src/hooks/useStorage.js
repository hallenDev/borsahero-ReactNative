import { useCallback } from 'react'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage'

const storage = new MMKVLoader().initialize()

const useStorage = () => {
  const [userStore, setUserStore] = useMMKVStorage('userStore', storage)
  const [authToken, setAuthToken] = useMMKVStorage('authToken', storage)
  const [firebaseToken, setFirebaseToken] = useMMKVStorage(
    'firebaseToken',
    storage,
  )

  const removeAuthToken = useCallback(async () => {
    storage.removeItem('authToken')
  }, [])

  const storeDetails = {
    userStore,
    setUserStore,
    authToken,
    setAuthToken,
    removeAuthToken,
    firebaseToken,
    setFirebaseToken,
  }

  return storeDetails
}

export default useStorage
