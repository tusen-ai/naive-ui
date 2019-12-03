# Slot API Debug
```html
<n-select v-model="value">
  <n-select-option label="label1" value="value1">
    Dog
  </n-select-option>
  <n-select-option label="label2" value="value2">
    Cat
  </n-select-option>
  <n-select-option label="label3" value="value3">
    Money
  </n-select-option>
  <n-select-option label="label4" value="value4">
    Tiger
  </n-select-option>
  <n-select-option label="label5" value="value5">
    Happy
  </n-select-option>
</n-select>
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