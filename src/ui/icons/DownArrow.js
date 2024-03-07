import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgDownArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path stroke="#fff" d="m5.5 8 4.5 4 4.5-4" />
  </Svg>
)
export default SvgDownArrow
