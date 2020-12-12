# 部分选中

```html
<n-checkbox v-model:checked="value" :indeterminate="indeterminate"
  >复选框</n-checkbox
>
<n-checkbox v-model:checked="value" :indeterminate="indeterminate" />
<n-checkbox v-model:checked="value" :indeterminate="indeterminate" disabled />
<n-button @click="value = !value" size="small">选中</n-button>
<n-button @click="indeterminate = !indeterminate" size="small"
  >部分选中</n-button
>
```

```js
export default {
  data() {
    return {
      value: false,
      indeterminate: false
    }
  }
}
```

```css
.n-checkbox,
.n-button {
  margin: 0 12px 8px 0;
}
```
