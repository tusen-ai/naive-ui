# 展示指令
可以制定标签页展示的指令为 `if` 或者 `show`。使用 `show` 的时候标签页内容不会随着切换重置。
```html
<n-tabs v-model:value="tab">
  <n-tab-pane name="show" display-directive="show" label="show">
    <show-input />
  </n-tab-pane>
  <n-tab-pane name="if" display-directive="if" label="if">
    <if-input />
  </n-tab-pane>
</n-tabs>
```
```js
import { h, resolveComponent } from 'vue'

const showInput = {
  data () {
    return {
      value: ''
    }
  },
  render () {
    return h(resolveComponent('n-input'), {
      placeholder: '我的内容不会被重置',
      value: this.value,
      onInput: v => {
        this.value = v
      }
    })
  }
}

const ifInput = {
  data () {
    return {
      value: ''
    }
  },
  render () {
    return h(resolveComponent('n-input'), {
      placeholder: '我的内容会被重置',
      value: this.value,
      onInput: v => {
        this.value = v
      }
    })
  }
}


export default {
  components: {
    showInput,
    ifInput
  },
  data () {
    return {
      tab: 'show',
      value2: ''
    }
  }
}
```