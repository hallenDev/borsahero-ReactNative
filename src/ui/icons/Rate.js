import * as React from 'react'
import Svg, { Path, Mask, G } from 'react-native-svg'
const SvgRate = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <Path
      fill="#fff"
      fillOpacity={0.4}
      d="m12.487 4 2.654 5.377 5.934.862-4.294 4.185 1.014 5.91-5.308-2.79-5.307 2.79 1.014-5.91L3.9 10.24l5.934-.862z"
    />
    <Mask
      id="rate_svg__a"
      width={19}
      height={17}
      x={3}
      y={4}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <Path
        fill="#fff"
        d="m12.487 4 2.654 5.377 5.934.862-4.294 4.185 1.014 5.91-5.308-2.79-5.307 2.79 1.014-5.91L3.9 10.24l5.934-.862z"
      />
    </Mask>
    <G mask="url(#rate_svg__a)">
      <Path fill="#fff" d="M3.9 8.515h17.306v12.791H3.9z" />
    </G>
  </Svg>
)
export default SvgRate
