# Use Preset Input
By default, the preset of `n-dynamic-input` is `input`.
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