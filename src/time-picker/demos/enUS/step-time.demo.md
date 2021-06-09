# Step Time

Pass a number as step or use an array of number to specify the item you want.

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