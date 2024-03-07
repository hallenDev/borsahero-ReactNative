import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MyIncomesMeausre from './MyIncomesMeausre'
import { colors, text } from '~/ui/theme'
import TabBar from '~/ui/TabBar'
import { PaidUsers, Followers, TotalBalance } from '~/ui/icons'

const MyIncomesFilter = ({ paidUserCount = 0, filter, onChange }) => {
  const selectedIndex = filter === 'earnings' ? 0 : 1

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My income</Text>

      <TabBar
        tabs={['Earnings', 'Donations']}
        selectedIndex={selectedIndex}
        containerStyle={styles.tabBar}
        onChange={index => onChange(index === 0 ? 'earnings' : 'donations')}
      />

      {selectedIndex === 0 && (
        <>
          <MyIncomesMeausre
            title="Paid users"
            value={paidUserCount}
            Icon={PaidUsers}
          />
          <MyIncomesMeausre title="Followers" value={321} Icon={Followers} />
          <MyIncomesMeausre
            title="Total balance"
            value="$1274.3"
            Icon={TotalBalance}
          />
        </>
      )}

      <Text style={styles.subTitle}>
        {selectedIndex === 0 ? 'Subscribers' : 'Donation history'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginBottom: 20,
  },
  tabBar: {
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginVertical: 20,
  },
})

export default MyIncomesFilter
