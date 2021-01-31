import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Cancel',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <line
          x1="368"
          y1="368"
          x2="144"
          y2="144"
          style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
        />
        <line
          x1="368"
          y1="144"
          x2="144"
          y2="368"
          style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"
        />
      </svg>
    )
  }
})
