import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useQuery } from 'react-query'
import TabBarIcon from '~/components/TabBarIcon'
import SubscriptionsFilter from '~/components/Subscriptions/SubscriptionsFilter'
import SubscriptionItem from '~/components/Subscriptions/SubscriptionItem'
import { getSubscriptionsForOtherUser } from '~/shared/api/member'
import { User } from '~/ui/icons'
import { colors } from '~/ui/theme'

const SubscritptionsScreen = () => {
  const toast = useToast()
  const [filter, setFilter] = useState({
    search: '',
    option: 'paid',
  })

  const { data: subscriptions = [] } = useQuery(
    'my-subscriptions-for-otheruser',
    () => getSubscriptionsForOtherUser(),
    {
      onError: error => {
        toast.show('', {
          type: 'notification',
          data: { title: error?.data?.msg, error: true },
        })
      },
    },
  )

  const renderItem = ({ item }) => (
    <SubscriptionItem isFree={filter?.option === 'free'} {...item} />
  )

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={subscriptions}
      renderItem={renderItem}
      ListHeaderComponent={
        <SubscriptionsFilter filter={filter} onChange={setFilter} />
      }
      indicatorStyle="white"
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    gap: 15,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: props => (
    <TabBarIcon {...props} Icon={User} color={colors.white} />
  ),
})

export default SubscritptionsScreen
