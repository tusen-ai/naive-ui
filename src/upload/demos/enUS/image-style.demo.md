# Thumbnail file list

Uploaded files can be listed with types, such as `list-type = "image"`.

Thumbnails can be created using your own custom method via the `create-thumbnail-url` property.

```html
<n-upload
  action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="image"
  :createThumbnailUrl="createThumbnailUrl"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
import { defineComponent, ref, h } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const fileListRef = ref([
      {
        id: 'a',
        name: 'My Fault.png',
        status: 'error'
      },
      {
        id: 'b',
        name: 'regular text.doc',
        status: 'finished',
        type: 'text/plain'
      },
      {
        id: 'c',
        name: 'image.png',
        status: 'finished',
        url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        id: 'd',
        name: 'Not Finished Yet.doc',
        status: 'uploading',
        percentage: 50
      }
    ])
    return {
      fileList: fileListRef,
      createThumbnailUrl (file) {
        message.info(() => [
          '`createThumbnailUrl` changes the thumbnail image of the uploaded file.',
          h('br'),
          'It will be 07akioni whatever you upload.'
        ])
        return '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    }
  }
})
```
