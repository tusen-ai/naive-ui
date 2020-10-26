# Min and Max
You can set min & max of it.
```html
<n-space vertical>
  <n-input-number
    v-model:value="value"
    placeholder="Min"
    :min="-3"
    :max="5"
  />
  <n-input-number
    v-model:value="value"
    placeholder="Max"
    :min="-5"
    :max="3"
  />
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
