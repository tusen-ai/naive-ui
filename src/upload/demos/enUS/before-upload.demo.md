# Limit uploading of files

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
  <n-button>Upload PNG</n-button>
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
        const isntPng = [...file].filter(
          (file) => file.type !== 'image/png'
        ).length
        if (isntPng) {
          message.error('Only upload picture files in png format, please re-upload.')
          return false
        }
        console.log(file)
        return true
      }
    }
  }
})
```
