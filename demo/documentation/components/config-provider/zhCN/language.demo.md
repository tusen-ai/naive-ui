# 语言
```html
<n-button @click="lang = 'en-US'">English</n-button>
<n-button @click="lang = 'zh-CN'">中文</n-button>
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