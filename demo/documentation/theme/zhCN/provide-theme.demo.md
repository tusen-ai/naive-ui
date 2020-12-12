# 提供主题

使用 `n-config-provider` 来设定它全部的后代组件主题。

```html
<n-config-provider :theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = 'dark'">深色</n-button>
      <n-button @click="theme = 'light'">浅色</n-button>
    </n-space>
  </n-card>
</n-config-provider>
```

```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
