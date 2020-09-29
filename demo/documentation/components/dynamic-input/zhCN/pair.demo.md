# 使用键值对预设
```html
<n-dynamic-input
  preset="pair"
  v-model:value="value"
  key-placeholder="环境变量名"
  value-placeholder="环境变量值"
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