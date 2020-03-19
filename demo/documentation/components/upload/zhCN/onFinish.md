# 上传完成的回调
你可以在回调中修改文件的属性。
```html
<div>
  <n-upload
    :on-finish="handleFinish"
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</div>
```
```js
export default {
  methods: {
    handleFinish (file, response) {
      file.url = 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
  }
}
```