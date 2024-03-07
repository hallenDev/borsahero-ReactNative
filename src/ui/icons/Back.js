import * as React from 'react'
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg'
const SvgBack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#back_svg__a)">
      <Rect width={24} height={24} fill="#fff" fillOpacity={0.06} rx={12} />
      <Path stroke="#fff" d="M14 7.5 10 12l4 4.5" />
    </G>
    <Defs>
      <ClipPath id="back_svg__a">
        <Rect width={24} height={24} fill="#fff" rx={12} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgBack
