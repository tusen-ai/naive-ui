# Theme Environment
Get current theme environment.
```html
<n-button @click="theme = 'dark'">Dark Theme</n-button>
<n-button @click="theme = 'light'">Light Theme</n-button>
<div>
  <n-config-provider :theme="theme" :theme-environment="env">
    <n-config-consumer>
      <template v-slot="{ themeEnvironment }">
        <div style="background-color: rgba(128, 128, 128); padding: 8px;">
          <n-tag>{{ themeEnvironment }}</n-tag>
        </div>
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