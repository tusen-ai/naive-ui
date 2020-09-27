# 基础用法
注入 `dialog` 来创建一个弹框。
```html
<n-button @click="handleConfirm">
  警告
</n-button>
<n-button @click="handleSuccess">
  成功
</n-button>
<n-button @click="handleError">
  错误
</n-button>
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
```js
export default {
  inject: [
    'dialog',
    'message'
  ],
  methods: {
    handleConfirm (e) {
      this.dialog.warning({
        title: '警告',
        content: '你确定？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: () => {
          this.message.success('确定')
        },
        onNegativeClick: () => {
          this.message.error('不确定')
        }
      })
    },
    handleSuccess (e) {
      this.dialog.success({
        title: '成功',
        content:
          '厉害',
        positiveText: '哇',
        onPositiveClick: () => {
          this.message.success('耶！')
        }
      })
    },
    handleError (e) {
      this.dialog.error({
        title: '错误',
        content: '错了',
        positiveText: '啊',
        onPositiveClick: () => {
          this.message.success('我就知道')
        }
      })
    }
  }
}
```