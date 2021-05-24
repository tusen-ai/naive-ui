# Display Directive

You can set tab-panel's display directive to `if` or `show`. When use show, the tab-panel's content won't be reset after tab changes.

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
      placeholder: "My content won't be reset"
    })
  }
})

const ifInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: 'My content will be reset'
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
