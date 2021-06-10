# 按钮设置

```html
<n-space align="center">
  <n-switch v-model:value="disabled" />
  <n-input-number :show-button="disabled" v-model:value="value" />
</n-space>
```

```js
export default {
  data () {
    return {
      value: 0,
      disabled: true
    }
  }
}
```
