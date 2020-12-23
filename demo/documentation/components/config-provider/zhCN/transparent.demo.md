# 不需要包裹 DOM

如果不需要包裹 DOM，设置 `abstract`。(注意，这种情况下只接受一个子节点)

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">深色主题</n-button>
    <n-button @click="theme = 'light'">浅色主题</n-button>
  </n-space>
  <n-config-provider :theme="theme" :theme-environments="env" abstract>
    <n-config-consumer #="{ themeEnvironment }">
      <n-card>
        <n-tag>无包裹 DOM：{{ themeEnvironment }}</n-tag>
      </n-card>
    </n-config-consumer>
  </n-config-provider>
</n-space>
```

```js
export default {
  data () {
    return {
      theme: 'dark',
      env: {
        dark: '氯化钠',
        light: '离子化合物'
      }
    }
  }
}
```
