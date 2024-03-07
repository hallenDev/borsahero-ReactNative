import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgClose = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={24} height={24} fill="#FFFFFF0F" fillOpacity={0.06} rx={12} />
    <Path stroke="#fff" d="m6 6 12 12m0-12L6 18" />
  </Svg>
)
export default SvgClose
