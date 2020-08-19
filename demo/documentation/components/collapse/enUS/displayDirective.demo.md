# Display Directive
Set `display-directive` to `if` or `show` to determine whether to keep the DOM inside `n-collapse-item` when inactive.
```html
<n-collapse v-model="activeNames" display-directive="show">
  <n-collapse-item title="right" name="1">
    <n-collapse v-model="activeNames2">
      <n-collapse-item title="right" name="1">
        <div>good</div>
      </n-collapse-item>
      <n-collapse-item title="right" name="2">
        <div>good</div>
      </n-collapse-item>
    </n-collapse>
  </n-collapse-item>
  <n-collapse-item title="right" name="2">
    <div>good</div>
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