import React from 'react'
import { useUser } from '~/context/UserContext'
import MembersNavigator from './MembersNavigator'
import PublicNavigator from './PublicNavigator'

const Navigator = () => {
  const { isSignedIn } = useUser()
  return isSignedIn ? <MembersNavigator /> : <PublicNavigator />
}

export default Navigator
