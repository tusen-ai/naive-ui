# Step Time

Pass a number as step or use an array to specify the item you want.

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
