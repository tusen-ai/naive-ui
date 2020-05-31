# No Wrapper DOM
If you don't need wrapper DOM, set `abstract` on it. (Note, in this case it can only take one child node.)
```html
<div>
  <n-button @click="theme = 'dark'">Dark Theme</n-button>
  <n-button @click="theme = 'light'">Light Theme</n-button>
</div>
<n-config-provider :theme="theme" :theme-environment="env" abstract>
  <n-config-consumer v-slot="{ themeEnvironment }">
    <n-card>
      <n-tag>No Wrapper DOM: {{ themeEnvironment }}</n-tag>
    </n-card>
  </n-config-consumer>
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