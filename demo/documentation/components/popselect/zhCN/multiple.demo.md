# 多选
在弹出选择选中多个值。

```html
<n-popselect
  v-model:value="value"
  multiple
  :options="options"
>
  <n-tag>{{ (Array.isArray(value) && value.length) ? value : '没了' }}</n-tag>
</n-popselect>
```
```js
export default {
  data () {
    return {
      value: null,
      options: [{
        label: 'Go Let It Out',
        value: 'Go Let It Out'
      }, {
        label: 'Who Feels Love?',
        value: 'Who Feels Love?'
      }, {
        label: 'Sunday Morning Call',
        value: 'Sunday Morning Call',
        disabled: true
      }, {
        label: 'Roll It Over',
        value: 'Roll It Over'
      }]
    }
  }
}
```