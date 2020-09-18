# 箭头位置
使用 `arrow-placement` 来设定箭头的位置。
```html
<n-collapse
  v-model:expandedNames="activeNames"
  arrow-placement="right"
>
  <n-collapse-item title="青铜" name="1">
    <div>可以</div>
  </n-collapse-item>
  <n-collapse-item title="白银" name="2">
    <div>很好</div>
  </n-collapse-item>
  <n-collapse-item title="黄金" name="3">
    <div>真棒</div>
  </n-collapse-item>
</n-collapse>
```
```js
export default {
  data() {
    return {
      activeNames: []
    }
  }
}
```