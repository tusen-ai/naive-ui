# Customize event handling

Maybe you want to customize the click event in the options.

```html
<n-dropdown trigger="hover" @select="handleSelect" :options="options">
  <n-button> Go For a Trip </n-button>
</n-dropdown>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'marina bay sands',
          props: {
            onClick: () => {
              message.success('Good!')
            }
          }
        },
        {
          label: "Brown's Hotel, London",
          key: "brown's hotel, london",
          props: {
            onClick: () => {
              message.info('Okay')
            }
          }
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'atlantis nahamas, nassau'
        }
      ],
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```
