import { StripeProvider } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ToastProvider } from 'react-native-toast-notifications'
import { MenuProvider } from 'react-native-popup-menu'
import Notification from '~/components/Notification'
import { STRIPE_PUBLISHABLE_KEY } from '~/configs/constants'
import UserProvider from '~/context/UserContext'
import NetworkProvider from '~/context/NetworkProvider'
import NavigationProvider from '~/navigation/NavigationProvider'
import Navigator from '~/navigation/Navigator'
import '~/utils/polyfills'
import '~/configs/day'

function App() {
  const [networkError, setNetworkError] = useState(false)

  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NetworkProvider setNetworkError={setNetworkError}>
          <GestureHandlerRootView style={styles.flex}>
            <ToastProvider
              placement="bottom"
              offsetBottom={85}
              renderType={{
                notification: toast => <Notification data={toast.data} />,
              }}
            >
              <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
                <MenuProvider>
                  <UserProvider>
                    <Navigator />
                  </UserProvider>
                </MenuProvider>
              </StripeProvider>
            </ToastProvider>
          </GestureHandlerRootView>
        </NetworkProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})

export default App
