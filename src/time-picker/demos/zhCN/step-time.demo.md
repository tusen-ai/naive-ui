# 展示某些时间

传递单独的数字来定义时间步进或用数组指定你需要显示的内容，输入超出设定范围的值将将显示无效样式。

```html
<n-time-picker
  :hours="[8,18]"
  :minutes="8"
  :seconds="[0]"
  v-model:value="time"
/>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: ref(1183135260000)
    }
  }
})
```
