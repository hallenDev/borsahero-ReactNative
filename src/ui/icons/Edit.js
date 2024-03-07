import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgEdit = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={24} height={24} fill="#fff" fillOpacity={0.06} rx={12} />
    <Path stroke="#fff" d="m13 8-7 7v3h3l7-7m-3-3 3 3m-3-3 2-2 3 3-2 2" />
  </Svg>
)
export default SvgEdit
