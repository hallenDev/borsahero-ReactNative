import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgEditVideo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path stroke="#fff" d="m11 6-7 7v3h3l7-7m-3-3 3 3m-3-3 2-2 3 3-2 2" />
  </Svg>
)
export default SvgEditVideo
