# Basic

```html
<n-space>
  <n-space>
    <n-time-picker v-model:value="time0" />
    <n-time-picker v-model:value="time1" />
  </n-space>
</n-space>
```

```js
export default {
  data () {
    return {
      time0: null,
      time1: 1183135260000
    }
  }
}
```
