import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgIncome = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="currentColor" d="M5.5 7.5h13v9h-13z" />
    <Circle cx={15} cy={13} r={1} fill="currentColor" />
  </Svg>
)
export default SvgIncome
