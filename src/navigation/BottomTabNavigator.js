import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DiscoverScreen, {
  options as DiscoverScreenOptions,
} from '~/screens/member/DiscoverScreen'
import SubscriptionsScreen, {
  options as SubscriptionsScreenOptions,
} from '~/screens/member/SubscriptionsScreen'
import MyIncomeScreen, {
  options as MyIncomeScreenOptions,
} from '~/screens/member/MyIncomeScreen'
import SettingsScreen, {
  options as SettingsScreenOptions,
} from '~/screens/member/SettingsScreen'
import MyProfileScreen, {
  options as MyProfileScreenOptions,
} from '~/screens/member/MyProfileScreen'
import VideoDetailsScreen, {
  options as VideoDetailsScreenOptions,
} from '~/screens/member/VideoDetailsScreen'
import ReviewsScreen, {
  options as ReviewsScreenOptions,
} from '~/screens/member/ReviewsScreen'
import UploadContentScreen, {
  options as UploadContentScreenOptions,
} from '~/screens/member/UploadContentScreen'
import { colors } from '~/ui/theme'
import UserProfileScreen, {
  options as UserProfileScreenOptions,
} from '~/screens/member/UserProfileScreen'

const Tab = createBottomTabNavigator()

const TAB_MAP = [
  ['Discover', DiscoverScreen, DiscoverScreenOptions],
  ['MySubscriptions', SubscriptionsScreen, SubscriptionsScreenOptions],
  ['MyIncome', MyIncomeScreen, MyIncomeScreenOptions],
  ['Settings', SettingsScreen, SettingsScreenOptions],
  ['MyProfile', MyProfileScreen, MyProfileScreenOptions],
  ['VideoDetails', VideoDetailsScreen, VideoDetailsScreenOptions],
  ['Reviews', ReviewsScreen, ReviewsScreenOptions],
  ['UploadContent', UploadContentScreen, UploadContentScreenOptions],
  ['UserProfile', UserProfileScreen, UserProfileScreenOptions],
]

const BottomTabMavigator = () => {
  const screenOptions = {
    tabBarStyle: {
      backgroundColor: colors.surface_primary,
      borderColor: colors.tabBorderColor,
    },
  }

  return (
    <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
      {TAB_MAP.map(([name, component, options]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTabMavigator
