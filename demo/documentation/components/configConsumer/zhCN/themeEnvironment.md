# 主题环境
获得当前主题环境值。
```html
<n-button @click="theme = 'dark'">深色主题</n-button>
<n-button @click="theme = 'light'">浅色主题</n-button>
<n-config-provider :theme="theme" :theme-environment="env">
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      <div style="background-color: rgba(128, 128, 128); padding: 8px;">
        <n-tag>{{ themeEnvironment }}</n-tag>
      </div>
    </template>
  </n-config-consumer>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      theme: 'light',
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
