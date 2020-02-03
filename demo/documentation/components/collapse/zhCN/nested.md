# 嵌套
可以嵌套。
```html
<n-collapse v-model="activeNames">
  <n-collapse-item title="绿灯" name="1">
    <n-collapse v-model="activeNames2">
      <n-collapse-item title="常亮" name="1">
        <div>通过</div>
      </n-collapse-item>
      <n-collapse-item title="闪烁" name="2">
        <div>快速通过</div>
      </n-collapse-item>
    </n-collapse>
  </n-collapse-item>
  <n-collapse-item title="红灯" name="2">
    <div>停</div>
  </n-collapse-item>
</n-collapse>
```
```js
export default {
  data() {
    return {
      activeNames: [],
      activeNames2: []
    }
  }
}
```
