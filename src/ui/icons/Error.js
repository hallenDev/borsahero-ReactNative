import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgError = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      fill="#FF3535"
      fillRule="evenodd"
      d="M4.619 12.427h6.762A1.951 1.951 0 0 0 13.07 9.5l-3.38-5.856a1.952 1.952 0 0 0-3.382 0L2.928 9.499a1.952 1.952 0 0 0 1.69 2.928m4.034-4.739a.658.658 0 1 1-1.316 0V6.372a.658.658 0 1 1 1.316 0zm-.658 2.632a.658.658 0 1 1 0-1.316.658.658 0 0 1 0 1.316"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgError
