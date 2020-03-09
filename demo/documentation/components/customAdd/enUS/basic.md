# Basic
```html
<n-custom-add
  v-model="test1"
  placeholder-key="placeholder1"
  placeholder-value="placeholder2"
/>
```
```js
export default {
  data () {
    return {
      test1: [
        {
          key: 'key1',
          value: 'value1'
        },
        {}
      ]
    }
  }
}
```