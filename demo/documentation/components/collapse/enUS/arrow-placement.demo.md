# Arrow Placement
Use `arrow-placement` to set the placement of arrow.
```html
<n-collapse
  v-model:expandedNames="activeNames"
  arrow-placement="right"
>
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