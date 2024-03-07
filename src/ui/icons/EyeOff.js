import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgEyeOff = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      stroke="currentColor"
      d="m10.1 4.965-.272-.177-.273.177L2.727 9.41l-.644.419.644.42 6.828 4.443.273.177.273-.177 6.828-4.444.644-.419-.644-.419z"
    />
    <Circle
      cx={10}
      cy={9.742}
      r={1}
      fill="currentColor"
      transform="rotate(45 10 9.742)"
    />
  </Svg>
)
export default SvgEyeOff
