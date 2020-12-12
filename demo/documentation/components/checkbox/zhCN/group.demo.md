# 选项组

```html
<n-checkbox-group v-model:value="cities">
  <n-checkbox value="Beijing" label="北京" />
  <n-checkbox value="Shanghai" label="上海" />
  <n-checkbox value="Guangzhou" label="广州" />
  <n-checkbox value="Shenzen" label="深圳" />
</n-checkbox-group>
```

```js
export default {
  data () {
    return {
      cities: null
    }
  }
}
```

```css
.n-checkbox {
  margin-right: 12px;
}
```
