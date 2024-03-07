import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgControlForward = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48L24 8.383l-7.437-.966 2.489-2.489A9.95 9.95 0 0 0 12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046C20.595 21.406 16.602 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0" />
  </Svg>
)
export default SvgControlForward
