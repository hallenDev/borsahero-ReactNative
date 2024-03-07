import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFilter = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path stroke="#fff" d="M10.237 11 5.474 4.75H15zm0 0v5" />
  </Svg>
)
export default SvgFilter
