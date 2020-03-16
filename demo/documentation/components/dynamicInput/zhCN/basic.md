# 使用输入预设
默认状况下，`n-dynamic-input` 的预设是 `input`。
```html
<n-dynamic-input
  v-model="value"
  placeholder="优化内容"
  :min="3"
  :max="6"
/>
<pre>
{{  JSON.stringify(value, 0, 2) }}
</pre>
```
```js
export default {
  data () {
    return {
      value: [
        '',
        '',
        ''
      ]
    }
  }
}
```