# 自定义操作

```html
<n-space>
  <n-popconfirm v-model:show="show">
    <template v-slot:trigger>
      <n-button>引用</n-button>
    </template>
    譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
    <template v-slot:action>
      <n-button size="small" @click="show = false"> 或许吧 </n-button>
    </template>
  </n-popconfirm>
  <n-popconfirm positive-text="噢!">
    <template v-slot:trigger>
      <n-button>引用</n-button>
    </template>
    譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
  </n-popconfirm>
</n-space>
```

```js
export default {
  data () {
    return {
      show: false
    }
  }
}
```
