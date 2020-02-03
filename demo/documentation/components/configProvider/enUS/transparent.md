# No Wrapper DOM
If you don't need wrapper DOM, set `transparent` on it. (Note, in this case it can only take one child node.)
```html
<div>
  <n-button @click="theme = 'dark'">Dark Theme</n-button>
  <n-button @click="theme = 'light'">Light Theme</n-button>
</div>
<n-config-provider :theme="theme" :theme-environment="env" transparent>
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      <n-tag>No Wrapper DOM: {{ themeEnvironment }}</n-tag>
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