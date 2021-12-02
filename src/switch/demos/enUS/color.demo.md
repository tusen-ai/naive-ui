# Custom colors

The colours of the rainbow.

```html
<n-space>
  <n-switch
    v-model:value="active"
    size="large"
    activeColor="linear-gradient( to right, orangered, orange, gold, lightgreen, cyan, dodgerblue, mediumpurple, hotpink, orangered)"
    activeButtonColor="rgba(255,255,255,0.5)"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(true)
    }
  }
})
```
