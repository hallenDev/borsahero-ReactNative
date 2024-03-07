import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgControlPlay = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M3 22V2l18 10z" />
  </Svg>
)
export default SvgControlPlay
