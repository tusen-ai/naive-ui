# Grid
Use checkbox with grid.
```html
<n-checkbox-group v-model="value">
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Prosperity">Prosperity</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Democracy">Democracy</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Civility">Civility</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Harmony">Harmony</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Freedom">Freedom</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Equality">Equality</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Justice">Justice</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Rule of Law">Rule of Law</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Patriotism">Patriotism</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Dedication">Dedication</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Integrity">Integrity</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Friendship">Friendship</n-checkbox>
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
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```