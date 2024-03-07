import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgProfile = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M5.5 8.29 12 4.576l6.5 3.714v7.42L12 19.424 5.5 15.71z"
    />
    <Circle cx={12} cy={12} r={1} fill="#fff" />
  </Svg>
)
export default SvgProfile
