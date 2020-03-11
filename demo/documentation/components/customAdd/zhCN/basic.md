# 基础用法
```html
<n-custom-add
  v-model="test"
  placeholder-key="placeholder1"
  placeholder-value="placeholder2"
  :on-add="add"
/>
<pre>
{{  JSON.stringify(test,0,2) }}
</pre>
```
```js
export default {
  data () {
    return {
      test: [
        ''
      ]
    }
  },
  methods: {
    add (resolve) {
      resolve('')
    }
  }
}
```