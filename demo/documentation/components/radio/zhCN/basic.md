# 基础用法
```html
<n-radio
  v-model="value"
  value="Definitely Maybe"
>
  Definitely Maybe
</n-radio>
<n-radio
  v-model="value"
  value="Be Here Now"
>
  Be Here Now
</n-radio>
<n-radio
  v-model="value"
  value="Be Here Now"
  :disabled="disabled"
>
  Be Here Now
</n-radio>
<n-switch v-model="disabled"/>

```
```js
export default {
  data () {
    return {
      disabled: true,
      value: null
    }
  }
}
```