# Get Theme
Use  `n-config-consumer`  to get the theme at current position.

```html
<div>
  <n-button @click="theme = 'dark'">Dark</n-button>
  <n-button @click="theme = 'light'">Light</n-button>
</div>
<n-config-provider :theme="theme">
  <n-card>
    <n-config-consumer
      @theme-change="handleThemeChange"
      v-slot="{ theme }"
    >
      <div>theme: {{ theme }}</div>
    </n-config-consumer>
  </n-card>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  },
  methods: {
    handleThemeChange (theme) {
      this.$NMessage.info(theme)
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```