import { StyleSheet, View, Text } from 'react-native'
import { Bank } from '~/ui/icons'
import { colors, text } from '~/ui/theme'

const PayoutDetails = ({
  bank_name,
  country,
  currency,
  details_submitted,
  last4,
  payouts_enabled,
  routing_number,
}) => (
  <View style={styles.container}>
    <Bank width={25} height={25} color={colors.white} />
    <View>
      <View style={styles.row}>
        <Text style={styles.text}>{bank_name}</Text>
        <Text style={[styles.text, styles.currency]}>{currency}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{routing_number}</Text>
        <Text style={styles.text}>**** {last4}</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222222',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontFamily: text.medium.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  currency: {
    textTransform: 'uppercase',
  },
})

export default PayoutDetails
