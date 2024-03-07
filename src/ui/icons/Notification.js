import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgNotification = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="#fff" d="m6.5 9.535 5.5-3.92 5.5 3.92V15.5h-11z" />
    <Circle cx={12} cy={18} r={1} fill="#fff" />
  </Svg>
)
export default SvgNotification
