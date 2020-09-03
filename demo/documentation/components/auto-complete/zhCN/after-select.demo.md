# 选择后的动作
在选中选项后清除内容或者选择后 Blur。
```html
<n-auto-complete
  :options="options"
  v-model="value"
  clear-after-select
  placeholder="选择后清空"
/>
<n-auto-complete
  :options="options"
  v-model="value"
  blur-after-select
  placeholder="选择后 Blur"
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
