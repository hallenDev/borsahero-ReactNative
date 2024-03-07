import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgBank = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M7 21H3V10h4zm7-11h-4v11h4zm7 0h-4v11h4zm2 12H1v2h22zM0 9h24L12 0z" />
  </Svg>
)
export default SvgBank
