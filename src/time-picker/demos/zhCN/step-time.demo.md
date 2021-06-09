# 展示某些时间

传递单独的数字来定义时间步进或指定你需要的。

```html
<n-time-picker
  v-model:value="time0"
  :seconds="[0]"
  :hours="[8,18]"
  :minutes="30"
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
