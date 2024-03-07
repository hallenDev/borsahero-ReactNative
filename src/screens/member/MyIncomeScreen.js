import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { useQuery } from 'react-query'
import TabBarIcon from '~/components/TabBarIcon'
import MyIncomesFilter from '~/components/MyIncomes/MyIncomesFilter'
import IncomeItem from '~/components/MyIncomes/IncomeItem'
import DonationItem from '~/components/MyIncomes/DonationItem'
import { getMyProfileSubscriptions } from '~/shared/api/member'
import { Income } from '~/ui/icons'
import { colors } from '~/ui/theme'

const MyIncomeScreen = ({ navigation }) => {
  const toast = useToast()
  const donations = Array(10).fill(0)
  const [filter, setFilter] = useState('earnings')

  const { data: incomes = [] } = useQuery(
    'my-profile-subscribers',
    () => getMyProfileSubscriptions(),
    {
      onError: error => {
        toast.show('', {
          type: 'notification',
          data: { title: error?.data?.msg, error: true },
        })
      },
    },
  )

  const renderItem = ({ item }) =>
    filter === 'earnings' ? (
      <IncomeItem
        {...item}
        onPress={() => navigation.navigate('UserProfile', { user: item.user })}
      />
    ) : (
      <DonationItem />
    )

  return (
    <FlatList
      data={filter === 'earnings' ? incomes : donations}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <MyIncomesFilter
          paidUserCount={incomes.length}
          filter={filter}
          onChange={setFilter}
        />
      }
      renderItem={renderItem}
      indicatorStyle="white"
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    gap: 15,
    padding: 20,
  },
})

export const options = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: props => (
    <TabBarIcon {...props} Icon={Income} color={colors.white} />
  ),
})

export default MyIncomeScreen
