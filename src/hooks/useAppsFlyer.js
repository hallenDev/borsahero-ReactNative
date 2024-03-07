import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import appsFlyer from 'react-native-appsflyer'

const initOptions = {
  isDebug: false,
  devKey: 'cC2UmAaABiRi4aeXvUumzF',
  appId: '6477696050',
  onInstallConversionDataListener: true,
  onDeepLinkListener: true,
}

const useAppsFlyer = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const onDeepLinkCanceller = appsFlyer.onDeepLink(res => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        navigation.navigate('Settings', { tabIndex: 2 })
      }
    })

    appsFlyer.initSdk(initOptions)

    return () => {
      onDeepLinkCanceller()
    }
  }, [])
}

export default useAppsFlyer
