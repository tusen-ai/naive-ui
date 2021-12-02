# Customizing colors

```html
<n-switch :rail-style="railStyle">
  <template #checked>Checked</template>
  <template #unchecked>Unchecked</template>
</n-switch>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      railStyle: ({ focused, checked }) => {
        const style = {}
        if (checked) {
          style.background = '#d03050'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#2080f0'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      }
    }
  }
})
```
