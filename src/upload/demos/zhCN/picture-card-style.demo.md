# 照片墙

`list-type = 'picture-card'`

照片墙中的预览会默认调用内部组件，你也可以使用 `on-preview` 自定义展示上传文件的方法

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="picture-card"
>
  <div :style="style">
    <n-icon size="30">
      <Ios-add />
    </n-icon>
    <span>Upload</span>
  </div>
</n-upload>
<n-divider />
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="previewFileList"
  list-type="picture-card"
  @preview="handlePreview"
>
  <div :style="style">
    <n-icon size="30">
      <Ios-add />
    </n-icon>
    <span>Upload</span>
  </div>
</n-upload>

<n-modal
  v-model:show="showModal"
  preset="card"
  :style="modalStyle"
  title="这是一张超酷的图片"
  size="huge"
  :bordered="false"
>
  <img :src="previewImageUrl" :style="imgStyle" />
</n-modal>
```

```js
import { IosAdd } from '@vicons/ionicons4'
export default {
  components: {
    IosAdd
  },
  methods: {
    handlePreview (file) {
      const { url, thumbUrl } = file
      this.previewImageUrl = url || thumbUrl
      this.showModal = true
    }
  },
  data () {
    return {
      style: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        height: '100%',
        'flex-direction': 'column'
      },
      imgStyle: {
        width: '100%'
      },
      modalStyle: {
        width: '600px'
      },
      showModal: false,
      previewImageUrl: '',
      fileList: [
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
      ],
      previewFileList: [
        {
          id: 'react',
          name: '我是react.png',
          status: 'finished',
          url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          id: 'vue',
          name: '我是vue.png',
          status: 'finished',
          url: 'https://cn.vuejs.org/images/logo.svg'
        }
      ]
    }
  }
}
```
