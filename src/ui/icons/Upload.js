import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgUpload = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <Path stroke="#946EFF" d="M10.5 13V4m0 0-4 4m4-4 4 4m-10 8h12" />
  </Svg>
)
export default SvgUpload
