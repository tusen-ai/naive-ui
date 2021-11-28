# Custom request

User `custom-request` to customize upload request.

```html
<n-upload
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :headers="{
    'naive-info': 'hello!'
  }"
  :data="{
    'naive-data': 'cool! naive!'
  }"
  :customRequest="customRequest"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
import { defineComponent } from 'vue'
import axios from 'axios'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const customRequest = ({
      file,
      data,
      headers,
      withCredentials,
      action,
      method,
      onFinish,
      onError,
      onProgress
    }) => {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })
      }
      formData.append(file.name, file)
      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ loaded, total }) => {
            onProgress({ percent: Math.ceil((loaded / total) * 100) })
          }
        })
        .then((e) => {
          message.success(e.data)
          onFinish(e.data)
        })
        .catch((error) => {
          onError(error)
        })
    }
    return {
      customRequest
    }
  }
})
```
