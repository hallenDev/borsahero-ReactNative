import * as React from 'react'
import Svg, { Rect, Path, Circle } from 'react-native-svg'
const SvgPaidUsers = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Rect
      width={40.427}
      height={40.427}
      x={5}
      y={4.787}
      fill="#85FF3A"
      rx={20.213}
    />
    <Rect
      width={44.469}
      height={44.469}
      x={2.979}
      y={2.765}
      stroke="#85FF3A"
      strokeOpacity={0.4}
      strokeWidth={4.043}
      rx={22.235}
    />
    <Path stroke="#141414" d="m19.5 27.032 5-2.475 5 2.475V30.5h-10z" />
    <Circle cx={24.5} cy={21.5} r={3} stroke="#141414" />
  </Svg>
)
export default SvgPaidUsers
