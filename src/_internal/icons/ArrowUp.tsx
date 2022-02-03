import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'ArrowUp',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <g fill="none">
          <path
            d="M3.13 9.163a.5.5 0 1 0 .74.674L9.5 3.67V17.5a.5.5 0 0 0 1 0V3.672l5.63 6.165a.5.5 0 0 0 .738-.674l-6.315-6.916a.746.746 0 0 0-.632-.24a.746.746 0 0 0-.476.24L3.131 9.163z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    )
  }
})
