import { h } from 'vue'
import { replaceable } from './replaceable'

export default replaceable(
  'trash',
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M432,144,403.33,419.74A32,32,0,0,1,371.55,448H140.46a32,32,0,0,1-31.78-28.26L80,144"
      style="fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
    ></path>
    <rect
      x="32"
      y="64"
      width="448"
      height="80"
      rx="16"
      ry="16"
      style="fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
    ></rect>
    <line
      x1="312"
      y1="240"
      x2="200"
      y2="352"
      style="fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
    ></line>
    <line
      x1="312"
      y1="352"
      x2="200"
      y2="240"
      style="fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
    ></line>
  </svg>
)
