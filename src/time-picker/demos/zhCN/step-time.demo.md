# 展示某些时间

你可以通常传递步进或者数组来只展示某些时间。

```html
<n-time-picker
  v-model:value="time0"
  :seconds="['05','10']"
  :hours="['01','02']"
  minutes="10"

/>
```

```js
export default {
  data () {
    return {
      time0: null
    }
  }
}
```
