import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Remove',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <line
          x1="400"
          y1="256"
          x2="112"
          y2="256"
          style="
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      "
        />
      </svg>
    )
  }
})
