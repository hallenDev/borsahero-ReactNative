import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import noop from '~/utils/noop'

const PricingCard = ({
  title,
  description,
  per_text,
  price,
  isLoading = false,
  isDisabled = false,
  onSubscribe = noop,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.priceInfo}>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.perText}>{per_text}</Text>
    </View>
    <Button
      type="primary"
      loading={isLoading}
      isDisabled={isDisabled}
      onPress={onSubscribe}
    >
      Subscribe
    </Button>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222222',
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 3,
    marginBottom: 20,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontFamily: text.medium.fontFamily,
    fontSize: 40,
    color: colors.white,
    marginRight: 5,
  },
  perText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
})

export default PricingCard
