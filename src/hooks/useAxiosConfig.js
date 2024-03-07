import axios from 'axios'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import VersionNumber from 'react-native-version-number'
import useStorage from './useStorage'

export default function useAxiosConfig() {
  const { authToken } = useStorage()

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      config.headers['X-APP-VERSION'] = VersionNumber.appVersion
      config.headers['X-BUILD-VERSION'] = VersionNumber.buildVersion
      config.headers['X-OS'] = Platform.OS
      config.headers['X-VERSION'] = Platform.Version

      if (authToken) {
        config.headers.authorization = `Bearer ${authToken}`
      } else {
        delete axios.defaults.headers.authorization
      }

      config.withCredentials = true

      // debug('->', config)

      return config
    })

    const responseInterceptor = axios.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        return Promise.reject(error?.response ? error?.response : error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [authToken])
}
