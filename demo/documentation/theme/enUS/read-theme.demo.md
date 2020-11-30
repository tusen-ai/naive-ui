# Get Theme
Use  `n-config-consumer`  to get the theme at current position.

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">Dark</n-button>
    <n-button @click="theme = 'light'">Light</n-button>
  </n-space>
  <n-config-provider :theme="theme">
    <n-card>
      <n-config-consumer
        @theme-change="handleThemeChange"
        #="{ theme }"
      >
        <div>theme: {{ theme }}</div>
      </n-config-consumer>
    </n-card>
  </n-config-provider>
</n-space>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      theme: 'dark'
    }
  },
  methods: {
    handleThemeChange (theme) {
      this.message.info(theme)
    }
  }
}
```
