import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
const SvgPlay = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 92 92"
    {...props}
  >
    <Circle cx={46} cy={46} r={36} fill="#fff" fillOpacity={0.4} />
    <Circle
      cx={46}
      cy={46}
      r={41}
      stroke="#fff"
      strokeOpacity={0.2}
      strokeWidth={10}
    />
    <Path fill="#fff" d="M64 46 37 61.589V30.412z" />
  </Svg>
)
export default SvgPlay
