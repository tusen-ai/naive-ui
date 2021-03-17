# 栅格

和栅格一起使用。

```html
<n-checkbox-group v-model:value="value">
  <n-grid :y-gap="8" :cols="2">
    <n-gi>
      <n-checkbox value="Prosperity" label="富强" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Democracy" label="民主" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Civility" label="文明" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Harmony" label="和谐" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Freedom" label="自由" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Equality" label="平等" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Justice" label="公正" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Rule of Law" label="法制" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Patriotism" label="爱国" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Dedication" label="敬业" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Integrity" label="诚信" />
    </n-gi>
    <n-gi>
      <n-checkbox value="Friendship" label="友善" />
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
