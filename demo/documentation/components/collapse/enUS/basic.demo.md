# Basic

```html
<n-collapse v-model:expandedNames="activeNames">
  <n-collapse-item title="right" name="1">
    <div>good</div>
  </n-collapse-item>
  <n-collapse-item title="right" name="2">
    <div>nice</div>
  </n-collapse-item>
  <n-collapse-item title="right" name="3">
    <div>very good</div>
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
