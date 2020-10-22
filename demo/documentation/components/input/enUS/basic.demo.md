# Basic
Basic usage of input.
```html
<n-space vertical align="stretch">
  <n-input v-model:value="value" type="input" placeholder="Basic Input"/>
  <n-input v-model:value="value" type="textarea"  placeholder="Basic Textarea"/>
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
