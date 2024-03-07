import React from 'react'
import UserInfoEdit from './ProfileTab/UserInfoEdit'
import EmailInfo from './ProfileTab/EmailInfo'
import PasswordInfo from './ProfileTab/PasswordInfo'
import AccountDelete from './ProfileTab/AccountDelete'
import ProfileSubscription from './ProfileTab/ProfileSubscription'

const ProfileTab = () => (
  <>
    <UserInfoEdit />
    <EmailInfo />
    <PasswordInfo />
    <AccountDelete />
    <ProfileSubscription />
  </>
)

export default ProfileTab
