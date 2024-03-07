import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { Close, GoLive, Notification } from '~/ui/icons'
import { colors, text } from '~/ui/theme'

const triggerStyles = {
  TriggerTouchableComponent: TouchableOpacity,
}

const optionsStyle = {
  optionsContainer: {
    backgroundColor: colors.surface_primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: 270,
    marginTop: 35,
    overflow: 'hidden',
  },
}

const NotificationMenu = () => {
  const notifications = Array(10).fill(0)

  const renderItem = ({ item, index }) => (
    <>
      <MenuOption style={styles.notificationItem} onSelect={() => {}}>
        <View style={styles.iconWrap}>
          <GoLive width={18} height={18} style={styles.closeIcon} />
        </View>

        <Text style={styles.itemText}>
          <Text style={styles.nameText}>Marry Jon</Text> started live stream
        </Text>
      </MenuOption>
      {index !== notifications.length - 1 && <View style={styles.divider} />}
    </>
  )
  return (
    <Menu style={styles.menu}>
      <MenuTrigger customStyles={triggerStyles}>
        <Notification />
        <View style={styles.badge}>
          <Text style={styles.badgeTitle}>3</Text>
        </View>
      </MenuTrigger>

      <MenuOptions customStyles={optionsStyle}>
        <View style={styles.titleHeader}>
          <Text style={styles.title}>Notifications</Text>
          <MenuOption style={styles.iconBtn}>
            <Close width={18} height={18} style={styles.closeIcon} />
          </MenuOption>
        </View>
        <View style={styles.divider} />
        <FlatList
          style={styles.list}
          data={notifications}
          renderItem={renderItem}
          indicatorStyle="white"
        />
      </MenuOptions>
    </Menu>
  )
}

const styles = StyleSheet.create({
  menu: {
    maxHeight: 200,
  },
  badge: {
    width: 14,
    height: 14,
    backgroundColor: '#FF3535',
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  badgeTitle: {
    fontFamily: text.regular.fontFamily,
    color: colors.white,
    fontSize: 10,
  },
  itemText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 15,
    marginRight: 15,
  },
  list: {
    maxHeight: 200,
  },
  nameText: {
    color: '#946EFF',
  },
  titleHeader: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: text.bold.fontFamily,
    color: colors.white,
    fontSize: 16,
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
  },
  iconBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
})

export default NotificationMenu
