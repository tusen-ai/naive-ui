# 类型
```html
<n-button @click="notify('info')">
  信息
</n-button>
<n-button @click="notify('success')">
  成功
</n-button>
<n-button @click="notify('warning')">
  警告
</n-button>
<n-button @click="notify('error')">
  错误
</n-button>
```
```js
export default {
  inject: ['notification'],
  methods: {
    notify (type) {
      this.notification[type]({
        content: '说点啥呢',
        meta: '想不出来'
      })
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```