# Pictures Wall

`list-type = 'picture-card'`

The preview in the photo wall will call the internal component by default, you can also use `on-preview` to customize the method of showing uploaded files.

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
  title="Coooooool Photo"
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
      ],
      previewFileList: [
        {
          id: 'react',
          name: 'I am react.png',
          status: 'finished',
          url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          id: 'vue',
          name: 'I am vue.png',
          status: 'finished',
          url: 'https://cn.vuejs.org/images/logo.svg'
        }
      ]
    }
  }
}
```
