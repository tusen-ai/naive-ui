# 手风琴

像一个手风琴

```html
<n-collapse v-model:expandedNames="activeNames" accordion>
  <n-collapse-item title="动态类型" name="1">
    <div>Python</div>
  </n-collapse-item>
  <n-collapse-item title="静态类型" name="2">
    <div>Java</div>
  </n-collapse-item>
</n-collapse>
```

```js
export default {
  data () {
    return {
      activeNames: []
    }
  }
}
```
