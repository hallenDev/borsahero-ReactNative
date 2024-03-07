import * as React from 'react'
import Svg, { Rect } from 'react-native-svg'
const SvgAgreeOff = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={24} height={24} fill="#222" fillOpacity={0.06} rx={12} />
    <Rect
      width={23}
      height={23}
      x={0.5}
      y={0.5}
      stroke="#fff"
      strokeOpacity={0.1}
      rx={11.5}
    />
  </Svg>
)
export default SvgAgreeOff
