import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgBackLeft = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={24} height={24} fill="#222" fillOpacity={0.06} rx={12} />
    <Path stroke="#fff" d="M14 7.5 10 12l4 4.5" />
  </Svg>
)
export default SvgBackLeft
