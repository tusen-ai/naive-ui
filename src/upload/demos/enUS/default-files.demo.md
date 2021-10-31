# Default file list

```html
<n-upload
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="defaultFileList"
>
  <n-button>Upload File</n-button>
</n-upload>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      defaultFileList: [
        {
          id: 'the',
          name: 'The',
          status: 'finished'
        },
        {
          id: 'razars',
          name: "Razars's",
          status: 'finished'
        },
        {
          id: 'edge',
          name: 'Blade',
          status: 'finished'
        }
      ]
    }
  }
})
```
