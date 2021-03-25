# 获取主题（deprecated)

使用配置消费者 `n-config-consumer` 来获取当前位置上的主题。

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">深色</n-button>
    <n-button @click="theme = 'light'">浅色</n-button>
  </n-space>
  <n-config-provider :theme="theme">
    <n-card>
      <n-config-consumer @theme-change="handleThemeChange" #="{ theme }">
        <div>主题：{{ theme }}</div>
      </n-config-consumer>
    </n-card>
  </n-config-provider>
</n-space>
```

```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  },
  methods: {
    handleThemeChange (theme) {
      console.log(theme)
    }
  }
}
```
