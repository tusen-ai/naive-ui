# Thumbnail File List

`list-type = 'picture'`

You can use `preview-file` to customize the thumbnails of the file.

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="picture"
  :createThumbnailUrl="createThumbnailUrl"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const fileListRef = ref([
      {
        id: 'a',
        name: 'I am a regular file with errors.png',
        status: 'error'
      },
      {
        id: 'b',
        name: 'I am a regular file.doc',
        status: 'finished',
        type: 'text/plain'
      },
      {
        id: 'c',
        name: 'I am a regular file with url.png',
        status: 'finished',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        id: 'd',
        name: 'I am uploading a normal file.doc',
        status: 'uploading',
        percentage: 99
      }
    ])
    return {
      fileList: fileListRef,
      createThumbnailUrl (file) {
        message.info(
          'previewFile changes the thumbnail image of the uploaded file so that it looks all Vue.'
        )
        return 'https://cn.vuejs.org/images/logo.svg'
      }
    }
  }
})
```
