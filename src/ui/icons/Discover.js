import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgDiscover = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="#fff" d="M5.5 18.5v-7.373L12 5.655l6.5 5.474V18.5z" />
    <Circle cx={12} cy={14} r={1} fill="#fff" />
  </Svg>
)
export default SvgDiscover
