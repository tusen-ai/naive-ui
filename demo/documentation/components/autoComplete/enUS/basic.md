# Basic
# Basic
```html
<n-auto-complete :options="options" v-model="value"/>
<br>
{{ value }}
```
```js
export default {
  computed: {
    options () {
      return [
        '@gmail.com',
        '@163.com',
        '@qq.com'
      ].map(suffix => ({
        label: this.value + suffix,
        value: this.value + suffix,
      }))
    }
  },
  data () {
    return {
      value: ''
    }
  }
}
```