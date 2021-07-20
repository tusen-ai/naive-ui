# Step Time

Pass a number as step or use an array to specify the items you want to show, entering values that are outside the set step will display invalid styles.

```html
<n-time-picker
  :hours="[8,18]"
  :minutes="8"
  :seconds="[0]"
  v-model:value="time"
/>
```

```js
export default {
  data () {
    return {
      time: 1183135260000
    }
  }
}
```
