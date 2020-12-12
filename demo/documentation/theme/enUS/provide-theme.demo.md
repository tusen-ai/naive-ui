# Provide Theme

Use `n-config-provider` to set the theme of all its descedant components.

```html
<n-config-provider :theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = 'dark'">Dark</n-button>
      <n-button @click="theme = 'light'">Light</n-button>
    </n-space>
  </n-card>
</n-config-provider>
```

```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
