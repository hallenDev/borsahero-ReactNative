import * as React from 'react'
import Svg, { Rect, Path, Circle } from 'react-native-svg'
const SvgTotalBalance = props => (
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
      fill="#6E3AFF"
      rx={20.213}
    />
    <Rect
      width={44.469}
      height={44.469}
      x={2.979}
      y={2.766}
      stroke="#6E3AFF"
      strokeOpacity={0.4}
      strokeWidth={4.043}
      rx={22.235}
    />
    <Path
      stroke="#fff"
      strokeWidth={1.011}
      d="M16.334 19.505h17.181v11.117H16.334zM19.366 22.032v6.064M30.484 22.032v6.064"
    />
    <Circle
      cx={24.925}
      cy={25.064}
      r={1.516}
      stroke="#fff"
      strokeWidth={1.011}
    />
  </Svg>
)
export default SvgTotalBalance
