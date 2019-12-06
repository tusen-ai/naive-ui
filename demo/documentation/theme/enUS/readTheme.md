# Get Theme
Use Config Consumer to get theme at current position.

```html
<n-config-provider :theme="theme">
  <n-button @click="theme = 'dark'">Dark</n-button>
  <n-button @click="theme = 'light'">Light</n-button>
  <n-config-consumer
    @theme-change="handleThemeChange"
  >
    <template v-slot="{ theme }">
      <div>theme: {{ theme }}</div>
    </template>
  </n-config-consumer>
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