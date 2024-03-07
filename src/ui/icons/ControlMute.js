import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgControlMute = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M3 9v6H2V9zm13-7L7 7v2.288l7-3.889v13.202l-7-3.889V17l9 5zM5 7H0v10h5zm17.324 4.993 1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653L24 13.649z" />
  </Svg>
)
export default SvgControlMute
