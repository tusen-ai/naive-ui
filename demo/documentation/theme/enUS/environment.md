# Theme Environment
Sometimes you may need some component to access some values at specific theme. You can use `theme-environment`. Config Consumer & Element have access to theme environment.
```html
<div>
  <n-button @click="theme = 'dark'">Dark Theme</n-button>
  <n-button @click="theme = 'light'">Light Theme</n-button>
</div>
<n-config-provider :theme="theme" :theme-environment="env">
  <n-card>
    <n-config-consumer v-slot="{ themeEnvironment }">
      <n-tag>{{ themeEnvironment }}</n-tag>
    </n-config-consumer>
  </n-card>
</n-config-provider>
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
```css
.n-button {
  margin: 0 8px 12px 0;
}
```