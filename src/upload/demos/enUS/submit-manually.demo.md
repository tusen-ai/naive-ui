# Uncontrolled Manually Submit

You can use `submit` method to submit in uncontrolled manner. Also you can do it in controlled manner in another way.

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
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
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
