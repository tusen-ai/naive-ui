# 使用键值对预设
```html
<n-dynamic-input
  preset="pair"
  v-model="value"
  key-placeholder="优化内容"
  value-placeholder="优化成本"
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
        {
          key: '',
          value: ''
        }
      ]
    }
  }
}
```