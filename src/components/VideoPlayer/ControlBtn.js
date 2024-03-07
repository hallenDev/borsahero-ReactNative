import { TouchableOpacity } from 'react-native'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'

const ControlBtn = ({ Icon, width = 20, height = 20, onPress = noop }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon width={width} height={height} color={colors.white} />
  </TouchableOpacity>
)

export default ControlBtn
