import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors, text } from '~/ui/theme'
import CreditCardBrandsMap from '~/shared/types/CreditCardBrandsMap'

const CreditCardDetails = ({ brand, name, last4 }) => {
  const brand_name = brand === 'americanexpress' ? 'amex' : brand
  return (
    <LinearGradient
      colors={['#000000', '#6E3AFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.cardBack}
    >
      <View style={styles.cardInfo}>
        <Text style={[styles.cardText, styles.brand]}>{brand_name}</Text>
        <Image
          source={CreditCardBrandsMap[brand_name]}
          style={styles.cardType}
        />
      </View>
      <View>
        <Text style={styles.cardText}>{name}</Text>
        <Text style={[styles.cardText, styles.mt10]}>
          **** - **** - **** - {last4}
        </Text>
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  cardBack: {
    padding: 20,
    borderRadius: 20,
    aspectRatio: 1.75,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    color: colors.white,
    fontSize: 24,
  },
  brand: {
    textTransform: 'capitalize',
  },
  cardText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  cardType: {
    width: 60,
    height: 30,
    resizeMode: 'center',
  },
  mt10: {
    marginTop: 8,
  },
})

export default CreditCardDetails
