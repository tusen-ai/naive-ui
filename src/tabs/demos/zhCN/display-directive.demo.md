# 展示指令

可以制定标签页展示的指令为 `if` 、 `show` 或者 `lazyload` 。使用 `show` 的时候标签页内容不会随着切换重置。使用 `lazyload` 的时候显示效果跟 `show` 一致，不过内容会进行延迟加载。

```html
<n-tabs default-value="show">
  <n-tab-pane name="show" display-directive="show" tab="show">
    <show-input />
  </n-tab-pane>
  <n-tab-pane name="if" display-directive="if" tab="if">
    <if-input />
  </n-tab-pane>
  <n-tab-pane name="lazyload" display-directive="lazyload" tab="lazyload">
    <lazyload-input />
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

const lazyloadInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: '我会延迟加载，并且之后我的内容不会被重置'
    })
  }
})

export default defineComponent({
  components: {
    showInput,
    ifInput,
    lazyloadInput
  }
})
```
