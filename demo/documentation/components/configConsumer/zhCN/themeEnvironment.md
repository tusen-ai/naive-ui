# 主题环境
```html
<n-button @click="theme = 'dark'">深色主题</n-button>
<n-button @click="theme = 'light'">浅色主题</n-button>
<n-config-provider :theme="theme" :theme-environment="env">
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      {{ themeEnvironment }}
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
        dark: '深色666',
        light: '浅色666'
      }
    }
  }
}
```
