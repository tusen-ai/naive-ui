# Display Directive

You can set tab-panel's display directive to `if` or `show`. When use show, the tab-panel's content won't be reset after tab changes.

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
  data() {
    return {
      value: ''
    }
  },
  render() {
    return h(resolveComponent('n-input'), {
      placeholder: "My content won't be reset",
      value: this.value,
      'onUpdate:value': (v) => {
        this.value = v
      }
    })
  }
}

const ifInput = {
  data() {
    return {
      value: ''
    }
  },
  render() {
    return h(resolveComponent('n-input'), {
      placeholder: "My content won't be reset",
      value: this.value,
      'onUpdate:value': (v) => {
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
  data() {
    return {
      tab: 'show',
      value2: ''
    }
  }
}
```
