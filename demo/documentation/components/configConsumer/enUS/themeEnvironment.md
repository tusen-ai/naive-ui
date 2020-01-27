# Theme Environment
```html
<n-button @click="theme = 'dark'">Dark Theme</n-button>
<n-button @click="theme = 'light'">Light Theme</n-button>
<div>
  <n-config-provider :theme="theme" :theme-environment="env">
    <n-config-consumer>
      <template v-slot="{ themeEnvironment }">
        {{ themeEnvironment }}
      </template>
    </n-config-consumer>
  </n-config-provider>
</div>
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