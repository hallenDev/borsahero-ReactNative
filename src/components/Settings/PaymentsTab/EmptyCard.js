import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import noop from '~/utils/noop'

const EmptyCard = ({ isLoading, onPress = noop }) => (
  <View style={styles.cardBack}>
    <Button
      type="primary"
      style={styles.btn}
      loading={isLoading}
      onPress={onPress}
    >
      Add
    </Button>
  </View>
)

const styles = StyleSheet.create({
  cardBack: {
    borderRadius: 20,
    aspectRatio: 1.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#6E3AFF',
    paddingVertical: 8,
    minHeight: 0,
    borderRadius: 100,
  },
  text: {
    color: colors.white,
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
  },
})

export default EmptyCard
