# Theme

Set theme of inner components of `n-config-provider`.

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
