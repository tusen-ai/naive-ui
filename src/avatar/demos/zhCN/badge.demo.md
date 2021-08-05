# 标记

和 `Badge` 一起用也挺好的 (如果你喜欢看到一堆一堆的推送)。

```html
<button @click="toggle">toggle</button>
<div v-show="isShow">
  <n-avatar ref="show">{{ value }}</n-avatar>
</div>
```

```js
import { defineComponent, nextTick, ref } from 'vue'

export default defineComponent({
  setup () {
    const isShow = ref(false)
    const show = ref(null)
    const toggle = () => {
      isShow.value = !isShow.value
      nextTick(() => {
        show.value.$forceUpdate()
      })
    }
    return {
      value: ref('Oasis111'),
      toggle,
      isShow,
      show
    }
  }
})
```
