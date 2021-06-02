import { h, defineComponent, ref } from 'vue'
import { NButton, NSsrProvider } from 'naive-ui'

const App = defineComponent({
  setup () {
    return {
      count: ref(0)
    }
  },
  render () {
    return h(
      NSsrProvider,
      {
        ssr: typeof window === 'undefined'
      },
      {
        default: () =>
          h(
            NButton,
            {
              onClick: () => this.count++
            },
            { default: () => this.count }
          )
      }
    )
  }
})

export default App
