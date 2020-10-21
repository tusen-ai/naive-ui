# 受控状态
```html
<n-space align="center" item-style="display: flex;">
  <n-checkbox :checked="value">复选框</n-checkbox>
  <n-switch v-model:value="value"/>
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
