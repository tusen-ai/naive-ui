# 展示指令

可以制定标签页展示的指令为 `if` 或者 `show`。使用 `show` 的时候标签页内容不会随着切换重置。

```html
<n-tabs default-value="show">
  <n-tab-pane name="show" display-directive="show" label="show">
    <show-input />
  </n-tab-pane>
  <n-tab-pane name="if" display-directive="if" label="if">
    <if-input />
  </n-tab-pane>
</n-tabs>
```

```js
import { h, defineComponent } from 'vue'
import { NInput } from 'naive-ui'

const showInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: '我的内容不会被重置'
    })
  }
})

const ifInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: '我的内容会被重置'
    })
  }
})

export default defineComponent({
  components: {
    showInput,
    ifInput
  }
})
```
