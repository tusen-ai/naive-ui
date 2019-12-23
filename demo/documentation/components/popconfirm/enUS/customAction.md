# Custom Action
```html
<n-popconfirm :controller="controller">
  <template v-slot:activator>
    <n-button>Quote</n-button>
  </template>
  For example, if I were to write about elephants, I’d have had no idea what words to use.
  <template v-slot:action>
    <n-button
      size="tiny"
      @click="handleClick"
    >
      Maybe
    </n-button>
  </template>
</n-popconfirm>
<n-popconfirm positive-text="Oops!">
  <template v-slot:activator>
    <n-button>Quote</n-button>
  </template>
  For example, if I were to write about elephants, I’d have had no idea what words to use.
</n-popconfirm>
```
```js
export default {
  data () {
    return {
      controller: {}
    }
  },
  methods: {
    handleClick () {
      this.controller.hide()
    }
  }
}
```
```css
.n-button {
  margin-right: 8px;
}
```