# Placement

Use different placement.

```html
<n-dropdown
  trigger="hover"
  @select="handleSelect"
  placement="bottom-start"
  :options="options"
>
  <n-button :keyboard="false">Go For a Trip</n-button>
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
          key: 'Marina Bay Sands'
        },
        {
          label: "Brown's Hotel, London",
          key: "Brown's Hotel, London"
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'Atlantis Bahamas, Nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'The Beverly Hills Hotel, Los Angeles'
        }
      ],
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```
