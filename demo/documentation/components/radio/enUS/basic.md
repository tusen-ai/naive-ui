# Basic
```html
<n-radio
  v-model="value"
  value="Definitely Maybe"
>
  Definitely Maybe
</n-radio>
<n-radio
  v-model="value"
  value="Be Here Now"
>
  Be Here Now
</n-radio>
<n-radio
  v-model="value"
  value="Be Here Now"
  disabled
>
  Be Here Now
</n-radio>
```
```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```