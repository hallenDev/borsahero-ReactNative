import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgDownOff = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Rect width={32} height={32} fill="#fff" rx={16} />
    <Path stroke="#141414" d="m11 11 10 10m-10 0 10-10" />
  </Svg>
)
export default SvgDownOff
