# 尺寸

```html
<n-tag closable size="small" @close="handleClose"> 爱在西元前 </n-tag>
<n-tag type="warning" closable @close="handleClose"> 超人不会飞 </n-tag>
<n-tag type="info" closable size="large" @close="handleClose">
  哪里都是你
</n-tag>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleClose() {
      this.message.info('tag close')
    }
  }
}
```

```css
.n-tag {
  margin-right: 12px;
  margin-bottom: 8px;
}
```
