# Language

```html
<n-space vertical>
  <n-space>
    <n-button @click="locale = null; dateLocale = null">en-US</n-button>
    <n-button @click="locale = zhCN; dateLocale = dateZhCN">zh-CN</n-button>
  </n-space>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-date-picker />
  </n-config-provider>
</n-space>
```

```js
import { ref } from 'vue'
import { zhCN, dateZhCN } from 'naive-ui'

export default {
  setup () {
    return {
      zhCN,
      dateZhCN,
      locale: ref(null),
      dateLocale: ref(null)
    }
  }
}
```
