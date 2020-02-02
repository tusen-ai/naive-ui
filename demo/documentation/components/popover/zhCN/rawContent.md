# 不用基础样式
```html
<n-popover raw :show-arrow="false">
  <template v-slot:activator>
    <n-button style="margin:0;">
      悬浮
    </n-button>
  </template>
  <div
    style="width: 100px; height: 100px; background-color: red; transform-origin: inherit;"
  >
    Who kicks a hole in the sky so the heaven cry over me.
  </div>
</n-popover>
```
```js
export default {
  data() {
    return {}
  }
}
```