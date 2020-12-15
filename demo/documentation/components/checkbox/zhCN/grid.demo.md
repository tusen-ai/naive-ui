# 栅格

和栅格一起使用。

```html
<n-checkbox-group v-model:value="value">
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Prosperity" label="富强" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Democracy" label="民主" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Civility" label="文明" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Harmony" label="和谐" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Freedom" label="自由" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Equality" label="平等" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Justice" label="公正" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Rule of Law" label="法制" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Patriotism" label="爱国" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Dedication" label="敬业" />
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="12">
      <n-checkbox value="Integrity" label="诚信" />
    </n-col>
    <n-col :span="12">
      <n-checkbox value="Friendship" label="友善" />
    </n-col>
  </n-row>
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

```css
.n-checkbox {
  margin: 0 12px 8px 0;
}
```
