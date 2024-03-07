import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppStatusBar from '~/components/AppStatusBar'
import DiscoverHeader from '~/components/DiscoverHeader/DiscoverHeader'
import { useUser } from '~/context/UserContext'
import useAppsFlyer from '~/hooks/useAppsFlyer'
import BottomTabNavigator from '~/navigation/BottomTabNavigator'
import SetupScreen from '~/screens/member/SetupScreen'
import { colors } from '~/ui/theme'

const HomeStack = createNativeStackNavigator()

const MembersNavigator = () => {
  const { hasProfileInfo } = useUser()

  useAppsFlyer()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppStatusBar />

      <HomeStack.Navigator
        initialRouteName={hasProfileInfo() ? 'Home' : 'SetupScreen'}
      >
        <HomeStack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            header: () => <DiscoverHeader />,
          }}
        />

        <HomeStack.Screen
          name="SetupScreen"
          component={SetupScreen}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface_primary,
  },
})

export default MembersNavigator
