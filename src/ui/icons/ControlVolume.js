import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgControlVolume = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M3 9v6H2V9zm13-7L7 7v2.288l7-3.889v13.202l-7-3.889V17l9 5zM5 7H0v10h5zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903a4.1 4.1 0 0 1-1.205 2.9l1.219 1.223a5.82 5.82 0 0 0 1.715-4.121 5.8 5.8 0 0 0-1.702-4.125zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254a8.88 8.88 0 0 0 2.616-6.291 8.85 8.85 0 0 0-2.595-6.293z" />
  </Svg>
)
export default SvgControlVolume
