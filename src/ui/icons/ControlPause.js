import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgControlPause = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M11 22H7V2h4zm6-20h-4v20h4z" />
  </Svg>
)
export default SvgControlPause
