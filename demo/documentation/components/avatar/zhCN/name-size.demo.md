# 字号
字号会根据内容文字自动调整。
```html
<n-space vertical item-style="line-height: 0;">
  <n-space>
    <n-avatar>{{ value }}</n-avatar>
    <n-avatar circle>{{ value }}</n-avatar>
    <n-avatar circle>the <br>{{ value }}</n-avatar>
  </n-space>
  <n-input v-model:value="value"/>
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
