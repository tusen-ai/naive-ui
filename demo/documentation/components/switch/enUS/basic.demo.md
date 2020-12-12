# Basic

```html
<n-space>
  <n-switch v-model:value="active" />
  <n-switch v-model:value="active" disabled />
</n-space>
```

```js
export default {
  data() {
    return {
      active: false
    }
  }
}
```
