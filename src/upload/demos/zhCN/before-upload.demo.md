# 限制上传文件

使用 `before-upload` 限制上传。

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :headers="{
    'naive-info': 'hello!'
  }"
  :data="{
    'naive-data': 'cool! naive!'
  }"
  @before-upload="beforeUpload"
>
  <n-button>上传 PNG 文件</n-button>
</n-upload>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      async beforeUpload({ file, fileList }) {
        const isNotPng = file.filter(
          (file) => file.type !== 'image/png'
        ).length
        if (isNotPng) {
          message.error('只能上传png格式的图片文件，请重新上传')
          return false
        }
        console.log(file)
        return true
      }
    }
  }
})
```
