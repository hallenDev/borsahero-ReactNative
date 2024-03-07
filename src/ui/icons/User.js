import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgUser = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="currentColor" d="m6.5 14.033 5-2.475 5 2.475V17.5h-10z" />
    <Circle cx={11.5} cy={8.5} r={3} stroke="currentColor" />
  </Svg>
)
export default SvgUser
