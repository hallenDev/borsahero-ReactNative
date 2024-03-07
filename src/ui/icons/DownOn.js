import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgDownOn = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 33 32"
    {...props}
  >
    <Rect width={32} height={32} x={0.5} fill="#fff" rx={16} />
    <Path stroke="#141414" d="M16.5 19v-9m0 0-4 4m4-4 4 4m-10 8h12" />
  </Svg>
)
export default SvgDownOn
