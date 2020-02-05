# Theme Environment
Get current theme environment.
```html
<n-button @click="theme = 'dark'">Dark Theme</n-button>
<n-button @click="theme = 'light'">Light Theme</n-button>
<div>
  <n-config-provider :theme="theme" :theme-environment="env">
    <n-config-consumer>
      <template v-slot="{ themeEnvironment }">
        <n-tag>{{ themeEnvironment }}</n-tag>
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
        dark: 'NaCl',
        light: 'Ionic Compound'
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