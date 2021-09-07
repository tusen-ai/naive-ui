# 上传完成的回调

你可以在回调中修改文件的属性。

```html
<n-upload
  @finish="handleFinish"
  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
>
  <n-button>上传文件</n-button>
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
