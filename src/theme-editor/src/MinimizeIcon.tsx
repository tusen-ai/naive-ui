import { h, defineComponent } from 'vue'

export const MinimizeIcon = defineComponent({
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path
          d="M4 18v2h6.586L2 28.582L3.414 30L12 21.414V28h2V18H4z"
          fill="currentColor"
        ></path>
        <path
          d="M30 3.416L28.592 2L20 10.586V4h-2v10h10v-2h-6.586L30 3.416z"
          fill="currentColor"
        ></path>
      </svg>
    )
  }
})
