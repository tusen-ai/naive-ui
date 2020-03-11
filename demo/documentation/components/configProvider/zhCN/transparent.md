# 不需要包裹 DOM
如果不需要包裹 DOM，设置 `abstract`。(注意，这种情况下只接受一个子节点)
```html
<div>
  <n-button @click="theme = 'dark'">深色主题</n-button>
  <n-button @click="theme = 'light'">浅色主题</n-button>
</div>
<n-config-provider :theme="theme" :theme-environment="env" abstract>
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      <div style="background-color: rgba(128, 128, 128); padding: 8px;">
        <n-tag>无包裹 DOM：{{ themeEnvironment }}</n-tag>
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
