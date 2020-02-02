# Language
```html
<n-button @click="lang = 'en-US'">en-us</n-button>
<n-button @click="lang = 'zh-CN'">zh-cn</n-button>
<n-config-provider :language="lang">
  <n-date-picker v-model="date" />
</n-config-provider>
```
```js
export default {
  data () {
    return {
      date: null,
      lang: 'en-US'
    }
  }
}
```
```css
.n-button {
  margin: 0 8px 12px 0;
}
```