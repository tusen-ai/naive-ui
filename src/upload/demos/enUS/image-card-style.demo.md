# Pictures Wall

`list-type = "image-card"`.

The preview in the photo wall will call the internal preview component by default, you can also use `on-preview` to customize the method of showing uploaded files.

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="image-card"
>
  Click to Upload
</n-upload>
<n-divider />
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="previewFileList"
  list-type="image-card"
  @preview="handlePreview"
>
  Click to Upload
</n-upload>

<n-modal
  v-model:show="showModal"
  preset="card"
  style="width: 600px;"
  title="A Cool Picture"
>
  <img :src="previewImageUrl" style="width: 100%;" />
</n-modal>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showModalRef = ref(false)
    const previewImageUrlRef = ref('')
    function handlePreview (file) {
      const { url } = file
      previewImageUrlRef.value = url
      showModalRef.value = true
    }
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      fileList: ref([
        {
          id: 'a',
          name: '我是上传出错的普通文件.png',
          status: 'error'
        },
        {
          id: 'b',
          name: '我是普通文本.doc',
          status: 'finished',
          type: 'text/plain'
        },
        {
          id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'd',
          name: '我是上传进度99%的文本.doc',
          status: 'uploading',
          percentage: 99
        }
      ]),
      previewFileList: ref([
        {
          id: 'react',
          name: '我是react.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'vue',
          name: '我是vue.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        }
      ])
    }
  }
})
```
