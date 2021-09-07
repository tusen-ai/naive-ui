# 限制上传文件

使用 `before-upload` 限制上传。

```html
<n-upload
  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  @before-upload="beforeUpload"
>
  <n-button>上传 PNG 文件</n-button>
</n-upload>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      async beforeUpload ({ file, fileList }) {
        if (file.file.type !== 'image/png') {
          message.error('只能上传png格式的图片文件，请重新上传')
          return false
        }
        return true
      }
    }
  }
})
```
