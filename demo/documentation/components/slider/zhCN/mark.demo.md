# 标记

```html
<n-space vertical>
  <n-slider v-model:value="value" range :marks="marks" :step="10" />
  <n-space>
    <n-input-number size="small" v-model:value="value[0]" />
    <n-input-number size="small" v-model:value="value[1]" />
  </n-space>
</n-space>
```

```js
export default {
  data() {
    return {
      value: [50, 70],
      marks: {
        34: '太棒了',
        75: '不错'
      }
    }
  }
}
```
