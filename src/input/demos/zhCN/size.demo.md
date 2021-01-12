# 尺寸

```html
<n-space vertical>
  <n-input v-model:value="value" type="input" size="small" placeholder="小" />
  <n-input v-model:value="value" type="input" placeholder="中" />
  <n-input v-model:value="value" type="input" size="large" placeholder="大" />
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
