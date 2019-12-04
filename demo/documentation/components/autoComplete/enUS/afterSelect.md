# After Select
```html
<n-auto-complete
  :options="options"
  v-model="value"
  clear-after-select
  placeholder="Clear After Select"
/>
<n-auto-complete
  :options="options"
  v-model="value"
  blur-after-select
  placeholder="Blur After Select"
/>
```
```js
export default {
  computed: {
    options () {
      return [
        '@gmail.com',
        '@163.com',
        '@qq.com'
      ].map(suffix => {
        const value = this.value === null ? '' : this.value
        const prefix = value.split('@')[0]
        return {
          label: prefix + suffix,
          value: prefix + suffix,
        }
      })
    }
  },
  data () {
    return {
      value: null
    }
  }
}
```
```css
.n-auto-complete {
  margin: 0 0 12px 0;
}
```