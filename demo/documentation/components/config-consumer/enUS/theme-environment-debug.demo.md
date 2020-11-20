# Theme Environments (Deprecated)
Get current theme environment.
```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">Dark Theme</n-button>
    <n-button @click="theme = 'light'">Light Theme</n-button>
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
        dark: 'NaCl',
        light: 'Ionic Compound'
      }
    }
  }
}
```