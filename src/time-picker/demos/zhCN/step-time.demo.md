# 步进时间

你可以传递步进或者数组来只展示某些时间。

```html
<n-time-picker
  v-model:value="time0"
  :hours="3"
  :minutes="[0,10,20,30,40,50]"
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
