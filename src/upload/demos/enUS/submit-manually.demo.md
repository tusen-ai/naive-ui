# Uncontrolled manually submit

You can use a `ref` to get a handle on files uploaded, and the `submit` method to submit them when you're ready.

```html
<n-button
  :disabled="!fileListLength"
  @click="handleClick"
  style="margin-bottom: 12px;"
>
  Upload File
</n-button>
<n-upload
  @change="handleChange"
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-upload="false"
  multiple
  ref="upload"
>
  <n-button>Select File</n-button>
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
