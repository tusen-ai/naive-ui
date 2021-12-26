# Disabled

Buttons can be disabled, rendering as a `div` does not affect other native events.

```html
<n-space>
  <n-button @mouseenter="handleButtonMouseEnter" disabled> Disabled </n-button>
  <n-button @mouseenter="handleDivMouseEnter" disabled tag="div">
    Can respond to other native events
  </n-button>
</n-space>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleButtonMouseEnter () {
        console.log('button')
      },
      handleDivMouseEnter () {
        console.log('div')
      }
    }
  }
})
```
