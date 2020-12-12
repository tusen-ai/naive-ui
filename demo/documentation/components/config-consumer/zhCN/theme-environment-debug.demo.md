# 主题环境（弃用）

获得当前主题环境值。

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">深色主题</n-button>
    <n-button @click="theme = 'light'">浅色主题</n-button>
  </n-space>
  <n-config-provider :theme="theme" :theme-environments="env">
    <n-config-consumer v-slot="{ themeEnvironment }">
      <n-card>
        <n-tag>{{ themeEnvironment }}</n-tag>
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
