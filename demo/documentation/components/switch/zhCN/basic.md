# 基础用法
```html
<n-switch
  v-model="active"
/>
<n-switch
  v-model="active"
  disabled
/>
```
```js
export default {
  data () {
    return {
      active: false
    }
  }
}
```