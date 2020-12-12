# 非受控手动提交

你可以使用 submit 方法来进行非受控状态下的手动提交。当然你也可以在受控模式下完全控制提交行为。

```html
<n-button
  :disabled="!fileListLength"
  @click="handleClick"
  style="margin-bottom: 12px;"
>
  上传文件
</n-button>
<n-upload
  @change="handleChange"
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-upload="false"
  multiple
  ref="upload"
>
  <n-button>选择文件</n-button>
</n-upload>
```

```js
export default {
  data() {
    return {
      fileListLength: 0
    }
  },
  methods: {
    handleChange({ fileList }) {
      this.fileListLength = fileList.length
    },
    handleClick() {
      this.$refs.upload.submit()
    }
  }
}
```
