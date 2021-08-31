import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Photo',
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
          <path d="M15 8h.01"></path>
          <rect x="4" y="4" width="16" height="16" rx="3"></rect>
          <path d="M4 15l4-4a3 5 0 0 1 3 0l5 5"></path>
          <path d="M14 14l1-1a3 5 0 0 1 3 0l2 2"></path>
        </g>
      </svg>
    )
  }
})
