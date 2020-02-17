# 展示指令
可以制定标签页展示的指令为 `if` 或者 `show`。使用 `show` 的时候标签页内容不会随着切换重置。
```html
<n-tabs v-model="tab">
  <n-tab-panel name="show" display-directive="show" label="show">
    <show-input />
  </n-tab-panel>
  <n-tab-panel name="if" display-directive="if" label="if">
    <if-input />
  </n-tab-panel>
</n-tabs>
```
```js
const showInput = {
  data () {
    return {
      value: ''
    }
  },
  render (h) {
    return h('n-input', {
      props: {
        placeholder: '我的内容不会被重置',
        value: this.value
      },
      on: {
        input: v => {
          this.value = v
        }
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
  render (h) {
    return h('n-input', {
      props: {
        placeholder: '我的内容会被重置',
        value: this.value
      },
      on: {
        input: v => {
          this.value = v
        }
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