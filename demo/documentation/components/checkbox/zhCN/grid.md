# 栅格
和栅格一起使用。
```html
<n-checkbox-group v-model="value">
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Prosperity">富强</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Democracy">民主</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Civility">文明</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Harmony">和谐</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Freedom">自由</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Equality">平等</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Justice">公正</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Rule of Law">法制</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Patriotism">爱过</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Dedication">敬业</n-checkbox>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Integrity">诚信</n-checkbox>
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Friendship">友善</n-checkbox>
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