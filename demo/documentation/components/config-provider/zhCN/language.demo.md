# 语言

```html
<n-space vertical>
  <n-space>
    <n-button @click="lang = 'en-US'">English</n-button>
    <n-button @click="lang = 'zh-CN'">中文</n-button>
  </n-space>
  <n-config-provider :language="lang">
    <n-date-picker v-model:value="date" />
  </n-config-provider>
</n-space>
```

```js
export default {
  data() {
    return {
      date: null,
      lang: 'en-US'
    }
  }
}
```
