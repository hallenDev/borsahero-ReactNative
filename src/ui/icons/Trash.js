import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
const SvgTrash = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={24} height={24} fill="#FF3535" fillOpacity={0.1} rx={12} />
    <Path stroke="currentColor" d="m9.5 17.5-2-8h9l-2 8zM9.5 6.5h5" />
  </Svg>
)
export default SvgTrash
