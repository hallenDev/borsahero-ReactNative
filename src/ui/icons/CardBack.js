import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgCardBack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 268 181"
    {...props}
  >
    <Rect
      width={268}
      height={180}
      y={0.5}
      fill="url(#card-back_svg__a)"
      rx={20}
    />
    <Defs>
      <LinearGradient
        id="card-back_svg__a"
        x1={-68}
        x2={333.492}
        y1={-36.959}
        y2={135.521}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.036} />
        <Stop offset={1} stopColor="#6E3AFF" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgCardBack
