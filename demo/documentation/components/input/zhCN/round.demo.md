# 圆角
文本输入可以是圆角的。
```html
<n-space vertical>
  <n-input v-model:value="value" size="small" round placeholder="小"/>
  <n-input v-model:value="value" round placeholder="中"/>
  <n-input v-model:value="value" size="large" round placeholder="大"/>
</n-space>
```
```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```
