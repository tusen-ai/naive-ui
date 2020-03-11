# Pair
```html
<n-custom-add
  preset="pair"
  v-model="test"
  placeholder-key="placeholder1"
  placeholder-value="placeholder2"
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
        {
          key: 'key1',
          value: 'value1'
        }
      ]
    }
  }
}
```