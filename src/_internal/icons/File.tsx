import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'File',
  render () {
    return (
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
        </g>
      </svg>
    )
  }
})
