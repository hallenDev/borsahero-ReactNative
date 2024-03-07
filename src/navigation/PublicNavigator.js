import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from '~/screens/public/LandingScreen'
import LoginScreen from '~/screens/public/LoginScreen'
import SignUpScreen from '~/screens/public/SignUpScreen'
import VerifyDeviceScreen from '~/screens/public/VerifyDeviceScreeen'
import ForgotScreen from '~/screens/public/ForgotScreen'
import ResetPasswordScreen from '~/screens/public/ResetPasswordScreen'
import NewPasswordScreen from '~/screens/public/NewPasswordScreen'
import TermsScreen from '~/screens/public/TermsScreen'
import HomeScreen from '~/screens/public/HomeScreen'
import AppStatusBar from '~/components/AppStatusBar'

const SCREEN_MAP = [
  ['LandingScreen', LandingScreen],
  ['LoginScreen', LoginScreen],
  ['SignUpScreen', SignUpScreen],
  ['VerifyDeviceScreen', VerifyDeviceScreen],
  ['ForgotScreen', ForgotScreen],
  ['ResetScreen', ResetPasswordScreen],
  ['NewPasswordScreen', NewPasswordScreen],
  ['TermsScreen', TermsScreen],
  ['HomeScreen', HomeScreen],
]

const Stack = createNativeStackNavigator()

const PublicNavigator = () => (
  <>
    <AppStatusBar />

    <Stack.Navigator initialRouteName="LandingScreen">
      <Stack.Group screenOptions={{ headerShown: false }}>
        {SCREEN_MAP.map(([name, component]) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  </>
)

export default PublicNavigator
