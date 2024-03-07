import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgFollowers = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Rect
      width={40.427}
      height={40.427}
      x={5}
      y={4.787}
      fill="#FF3535"
      rx={20.213}
    />
    <Rect
      width={44.469}
      height={44.469}
      x={2.979}
      y={2.765}
      stroke="#FF3535"
      strokeOpacity={0.4}
      strokeWidth={4.043}
      rx={22.235}
    />
    <Path
      stroke="#fff"
      d="M29.043 19 25 23.042 20.957 19l-4.042 4.043L25 31.128l8.085-8.086z"
    />
  </Svg>
)
export default SvgFollowers
