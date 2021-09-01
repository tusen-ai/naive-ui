# 缩略图文件列表

`list-type = 'picture'`

你可以使用 `preview-file`自定义文件的缩略图

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="picture"
  :create-thumbnail-url="createThumbnailUrl"
>
  <n-button>上传文件</n-button>
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
        url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        id: 'd',
        name: '我是上传进度99%的文本.doc',
        status: 'uploading',
        percentage: 99
      }
    ])
    return {
      fileList: fileListRef,
      createThumbnailUrl (file) {
        message.info('previewFile改变了上传文件的缩略图，让它看起来都是Vue。')
        return 'https://cn.vuejs.org/images/logo.svg'
      }
    }
  }
})
```
