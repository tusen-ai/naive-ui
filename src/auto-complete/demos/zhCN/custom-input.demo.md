# 自定义输入元素

你可以替换 AutoComplete 的输入元素。

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  #="{ handleInput, handleBlur, handleFocus, value }"
>
  <n-input
    type="textarea"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :value="value"
    placeholder="邮箱"
  />
</n-auto-complete>
```

```js
export default {
  computed: {
    options () {
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const prefix = this.value.split('@')[0]
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    }
  },
  data () {
    return {
      value: ''
    }
  }
}
```
