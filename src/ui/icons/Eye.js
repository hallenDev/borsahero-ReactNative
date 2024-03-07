import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgEye = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 17"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M15.656 6.828 13.949 7.94m-5.121 3.333V14m0-2.728 1.707-1.111m-1.707 1.111L7.12 10.161M2 6.828 3.707 7.94M5.414 9.05 4 11.5m1.414-2.45L3.707 7.939M5.414 9.05l1.707 1.111m5.12-1.111L13.5 11.5m-1.258-2.45 1.707-1.111M12.242 9.05l-1.707 1.111M3.707 7.939 1.646 10m12.303-2.061L16.009 10m-5.474.161L11.5 13m-4.38-2.839L6.5 13"
    />
  </Svg>
)
export default SvgEye
