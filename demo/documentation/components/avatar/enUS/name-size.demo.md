# Content Size

Words' sizing would be auto adjusted in avatar.

```html
<n-space vertical item-style="line-height: 0;">
  <n-space>
    <n-avatar>{{ value }}</n-avatar>
    <n-avatar circle>{{ value }}</n-avatar>
  </n-space>
  <n-input v-model:value="value" />
</n-space>
```

```js
export default {
  data () {
    return {
      value: 'Oasis'
    }
  }
}
```
