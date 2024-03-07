import * as React from 'react'
import Svg, { Rect, Path, Circle } from 'react-native-svg'
const SvgProfileSubscription = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 49 48"
    {...props}
  >
    <Rect
      width={44}
      height={44}
      x={2.5}
      y={2}
      stroke="#fff"
      strokeOpacity={0.1}
      strokeWidth={4}
      rx={22}
    />
    <Path
      stroke="#fff"
      strokeWidth={1.011}
      d="M16.005 18.505h17.181v11.117H16.005zM19.038 21.033v6.064M30.155 21.033v6.064"
    />
    <Circle
      cx={24.596}
      cy={24.064}
      r={1.516}
      stroke="#fff"
      strokeWidth={1.011}
    />
  </Svg>
)
export default SvgProfileSubscription
