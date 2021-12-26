# 禁用

按钮可以被禁用，渲染成 `div` 不影响其他原生事件。

```html
<n-space>
  <n-button @mouseenter="handleButtonMouseEnter" disabled> 不许点 </n-button>
  <n-button @mouseenter="handleDivMouseEnter" disabled tag="div">
    可以响应其他原生事件
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
