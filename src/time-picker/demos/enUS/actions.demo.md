# Actions

```html
<n-space vertical>
  <n-time-picker v-model:value="ts1" :actions="['now']" />
  <n-time-picker v-model:value="ts2" :actions="null" />
</n-space>
```

```js
export default {
  data () {
    return {
      ts1: null,
      ts2: 861333934000
    }
  }
}
```
