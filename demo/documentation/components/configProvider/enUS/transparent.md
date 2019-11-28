# Transparent
If you don't need wrapper DOM, set it to transparent.
```html
<n-button @click="theme = 'dark'">Dark Theme</n-button>
<n-button @click="theme = 'light'">Light Theme</n-button>
<n-config-provider :theme="theme" :theme-environment="env" transparent>
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      No Wrapper DOM: {{ themeEnvironment }}
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
        dark: 'Dark 666',
        light: 'Light 666'
      }
    }
  }
}
```