import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgUploadMedia = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <Rect width={40} height={40} x={4} y={4} fill="#6E3AFF" rx={20} />
    <Rect
      width={44}
      height={44}
      x={2}
      y={2}
      stroke="#6E3AFF"
      strokeOpacity={0.4}
      strokeWidth={4}
      rx={22}
    />
    <Path stroke="#fff" d="M24 27v-9m0 0-4 4m4-4 4 4m-10 8h12" />
  </Svg>
)
export default SvgUploadMedia
