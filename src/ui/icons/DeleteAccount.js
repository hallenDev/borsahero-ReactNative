import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgDeleteAccount = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 49 48"
    {...props}
  >
    <Rect
      width={44}
      height={44}
      x={2.5}
      y={2}
      stroke="#fff"
      strokeOpacity={0.1}
      strokeWidth={4}
      rx={22}
    />
    <Path stroke="#fff" d="m22 29.5-2-8h9l-2 8zM22 18.5h5" />
  </Svg>
)
export default SvgDeleteAccount
