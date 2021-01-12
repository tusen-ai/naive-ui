# Controlled Checkbox

```html
<n-space align="center" item-style="display: flex;">
  <n-checkbox :checked="value">Checkbox</n-checkbox>
  <n-switch v-model:value="value" />
</n-space>
```

```js
export default {
  data () {
    return {
      value: false
    }
  }
}
```
