# 主题环境

你有的时候可能需要让一些组件在特定主题下获取一些值，这个时候你可以设定环境主题。

```html
<div>
  <n-button @click="theme = 'dark'">深色主题</n-button>
  <n-button @click="theme = 'light'">浅色主题</n-button>
</div>
<n-config-provider :theme="theme" :theme-environments="env">
  <n-card>
    <n-config-consumer v-slot="{ themeEnvironment }">
      <n-tag>{{ themeEnvironment }}</n-tag>
    </n-config-consumer>
  </n-card>
</n-config-provider>
```

```js
export default {
  data() {
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

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
