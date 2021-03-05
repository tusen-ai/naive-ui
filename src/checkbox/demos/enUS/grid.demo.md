# Grid

Use checkbox with grid.

```html
<n-checkbox-group v-model:value="value">
  <n-grid :y-gap="8" :cols="2">
    <n-gi>
      <n-checkbox value="Prosperity" label="Prosperity" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Democracy" label="Democracy" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Civility" label="Civility" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Harmony" label="Harmony" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Freedom" label="Freedom" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Equality" label="Equality" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Justice" label="Justice" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Rule of Law" label="Rule of Law" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Patriotism" label="Patriotism" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Dedication" label="Dedication" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Integrity" label="Integrity" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Friendship" label="Friendship" />
    </n-gi>
  </n-grid>
</n-checkbox-group>
```

```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```
