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
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-upload="false"
  multiple
  ref="upload"
>
  <n-button>选择文件</n-button>
</n-upload>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const fileListLengthRef = ref(0)
    const uploadRef = ref(null)

    return {
      upload: uploadRef,
      fileListLength: fileListLengthRef,
      handleChange ({ fileList }) {
        fileListLengthRef.value = fileList.length
      },
      handleClick () {
        uploadRef.value.submit()
      }
    }
  }
})
```
