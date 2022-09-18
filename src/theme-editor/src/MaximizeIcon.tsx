import { h, defineComponent } from 'vue'

export const MaximizeIcon = defineComponent({
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <g fill="none">
          <path
            d="M8.5 2a.5.5 0 0 0 0 1h3.793L3 12.293V8.5a.5.5 0 0 0-1 0v4.9a.6.6 0 0 0 .6.6h4.9a.5.5 0 0 0 0-1H3.707L13 3.707V7.5a.5.5 0 0 0 1 0V2.6a.6.6 0 0 0-.6-.6H8.5z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    )
  }
})
