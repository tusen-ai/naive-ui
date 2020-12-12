# Theme Environments (Deprecated)

Sometimes you may need some component to access some values at specific theme. You can use `theme-environments`.

```html
<div>
  <n-button @click="theme = 'dark'">Dark Theme</n-button>
  <n-button @click="theme = 'light'">Light Theme</n-button>
</div>
<n-config-provider :theme="theme" :theme-environments="env">
  <n-config-consumer v-slot="{ themeEnvironment }">
    <n-card>
      <n-tag>{{ themeEnvironment }}</n-tag>
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
