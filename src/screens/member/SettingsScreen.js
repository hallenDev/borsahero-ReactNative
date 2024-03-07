import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TabBarIcon from '~/components/TabBarIcon'
import ProfileTab from '~/components/Settings/ProfileTab'
import PaymentsTab from '~/components/Settings/PaymentsTab'
import SubscriptionsTab from '~/components/Settings/SubscriptionsTab'
import { Profile } from '~/ui/icons'
import { colors, text } from '~/ui/theme'
import TabBar from '~/ui/TabBar'

const SettingsScreen = ({ route }) => {
  const { tabIndex: defaultTabIndex = 0 } = route.params || {}
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    setTabIndex(defaultTabIndex)
  }, [defaultTabIndex])

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle="white"
    >
      <Text style={styles.title}>Settings</Text>

      <TabBar
        tabs={['Profile', 'Subscriptions', 'Payments']}
        selectedIndex={tabIndex}
        containerStyle={styles.tabBar}
        onChange={setTabIndex}
      />

      {tabIndex === 0 ? (
        <ProfileTab />
      ) : tabIndex === 1 ? (
        <SubscriptionsTab />
      ) : (
        <PaymentsTab checkPayoutDetails={defaultTabIndex === 2} />
      )}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginVertical: 10,
  },
  tabBar: {
    marginTop: 10,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: props => <TabBarIcon {...props} Icon={Profile} />,
})

export default SettingsScreen
