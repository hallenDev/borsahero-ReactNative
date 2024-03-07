import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useUser } from '~/context/UserContext'
import { colors, text } from '~/ui/theme'
import userImage from '~/assets/images/user.png'

const triggerStyles = {
  TriggerTouchableComponent: TouchableOpacity,
}

const optionsStyle = {
  optionsContainer: {
    backgroundColor: colors.surface_primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: 170,
    marginTop: 50,
  },
}

const ProfileMenu = () => {
  const navigation = useNavigation()
  const { user, logout } = useUser()

  return (
    <Menu style={styles.menu}>
      <MenuTrigger customStyles={triggerStyles}>
        <FastImage
          source={{ uri: user.avatar }}
          resizeMode="cover"
          style={styles.avatar}
        />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyle}>
        <MenuOption onSelect={() => navigation.navigate('MyProfile')}>
          <Text style={styles.itemText}>My profile</Text>
        </MenuOption>
        <View style={styles.divider} />
        <MenuOption onSelect={() => navigation.navigate('UploadContent')}>
          <Text style={styles.itemText}>Upload content</Text>
        </MenuOption>
        <View style={styles.divider} />
        <MenuOption onSelect={() => logout()}>
          <Text style={[styles.itemText, styles.logOut]}>Log out</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(133, 255, 58, 0.4)',
    borderRadius: 20,
  },
  menu: {
    marginLeft: 15,
  },
  itemText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  logOut: {
    color: '#FF3535',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default ProfileMenu
