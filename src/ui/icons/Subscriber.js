import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
const SvgSubscriber = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <Path stroke="#fff" d="m.917 7 5.911-3.847L12.74 7l-5.912 3.847z" />
    <Circle
      cx={7}
      cy={6.914}
      r={1}
      fill="#fff"
      transform="rotate(45 7 6.914)"
    />
  </Svg>
)
export default SvgSubscriber
