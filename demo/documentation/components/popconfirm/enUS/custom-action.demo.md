# Custom Action

```html
<n-space>
  <n-popconfirm v-model:show="show">
    <template v-slot:trigger>
      <n-button>Quote</n-button>
    </template>
    For example, if I were to write about elephants, I’d have had no idea what
    words to use.
    <template v-slot:action>
      <n-button size="small" @click="show = false"> Maybe </n-button>
    </template>
  </n-popconfirm>
  <n-popconfirm positive-text="Oops!">
    <template v-slot:trigger>
      <n-button>Quote</n-button>
    </template>
    For example, if I were to write about elephants, I’d have had no idea what
    words to use.
  </n-popconfirm>
</n-space>
```

```js
export default {
  data() {
    return {
      show: false
    }
  }
}
```
