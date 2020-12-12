# 受控的文件列表

下面的例子纯属玩笑。

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :file-list="fileList"
  @change="handleUploadChange"
  @remove="handleRemove"
>
  <n-button>上传文件</n-button>
</n-upload>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      fileList: [
        {
          id: 'url-test',
          name: 'URL 测试',
          url: 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f',
          status: 'finished'
        },
        {
          id: 'text-message',
          name: '你的短信',
          status: 'error'
        },
        {
          id: 'notification',
          name: '你的通知',
          status: 'finished'
        },
        {
          id: 'contact',
          name: '你的联系人信息',
          status: 'finished'
        }
      ]
    }
  },
  methods: {
    handleUploadChange({ fileList }) {
      this.fileList = fileList
    },
    handleRemove({ file, fileList }) {
      if (file.id === 'text-message') {
        this.message.info('居然没传上去，算了，删了吧')
      } else if (file.id === 'notification') {
        this.message.error('不行，这个有用，不许删')
        return false
      } else if (file.id === 'contact') {
        const message = this.message.loading(
          '不知道这个有没有用，等我问问服务器能不能删',
          {
            duration: 4000
          }
        )
        return new Promise((resolve) => {
          setTimeout(() => {
            this.message.error('不行，他们也不许删这个')
            resolve(false)
          }, 4000)
        })
      }
    }
  }
}
```
