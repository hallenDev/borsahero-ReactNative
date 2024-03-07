import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgAgreeOn = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={23} height={23} x={0.5} y={0.5} fill="#6E3AFF" rx={11.5} />
    <Rect width={23} height={23} x={0.5} y={0.5} stroke="#fff" rx={11.5} />
    <Path stroke="#fff" d="m7 11.5 3.5 3.5 6-6" />
  </Svg>
)
export default SvgAgreeOn
