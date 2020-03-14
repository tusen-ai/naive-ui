# 使用输入预设
```html
<n-dynamic-input
  v-model="value"
  placeholder="优化内容"
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
        ''
      ]
    }
  }
}
```