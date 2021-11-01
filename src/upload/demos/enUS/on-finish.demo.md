# Change file on finish

You can change a file's properties after its upload has finished.

```html
<n-upload
  @finish="handleFinish"
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const handleFinish = ({ file, event }) => {
      message.success(event.target.response)
      const ext = file.name.split('.')[1]
      file.name = `renamed.${ext}`
      file.url = '__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
    return {
      message,
      handleFinish
    }
  }
})
```
