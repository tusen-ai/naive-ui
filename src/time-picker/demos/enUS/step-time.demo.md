# Step Time

Pass a number as a step or Pass a array as option。

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
