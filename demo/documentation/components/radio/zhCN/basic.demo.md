# 基础用法
```html
<n-space>
  <n-radio
    v-model:checked-value="value"
    value="Definitely Maybe"
  >
    Definitely Maybe
  </n-radio>
  <n-radio
    v-model:checked-value="value"
    value="Be Here Now"
  >
    Be Here Now
  </n-radio>
  <n-radio
    v-model:checked-value="value"
    value="Be Here Now"
    :disabled="disabled"
  >
    Be Here Now
  </n-radio>
  <n-switch v-model:value="disabled"/>
</n-space>
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
