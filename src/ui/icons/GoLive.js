import * as React from 'react'
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg'
const SvgGoLive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <G clipPath="url(#go-live_svg__a)">
      <Path stroke="#fff" d="M4 12 0 8l4-4" />
      <Circle cx={8} cy={8} r={2} fill="#fff" />
      <Path stroke="#fff" d="m12 4 4 4-4 4" />
    </G>
    <Defs>
      <ClipPath id="go-live_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgGoLive
