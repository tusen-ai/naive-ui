# Change File on Finish

You can change file's property when upload finishes.

```html
<n-upload
  @finish="handleFinish"
  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
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
      file.url = 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
    return {
      message,
      handleFinish
    }
  }
})
```
