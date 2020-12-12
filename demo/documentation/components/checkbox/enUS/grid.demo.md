# Grid

Use checkbox with grid.

```html
<n-checkbox-group v-model:value="value">
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Prosperity" label="Prosperity" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Democracy" label="Democracy" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Civility" label="Civility" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Harmony" label="Harmony" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Freedom" label="Freedom" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Equality" label="Equality" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Justice" label="Justice" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Rule of Law" label="Rule of Law" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Patriotism" label="Patriotism" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Dedication" label="Dedication" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Integrity" label="Integrity" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Friendship" label="Friendship" />
    </n-col>
  </n-row>
</n-checkbox-group>
```

```js
export default {
  data() {
    return {
      value: null
    }
  }
}
```

```css
.n-checkbox,
.n-button {
  margin: 0 12px 8px 0;
}
```
