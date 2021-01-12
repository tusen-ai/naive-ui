# Controlled File List

Example is only a joke.

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :file-list="fileList"
  @change="handleUploadChange"
  @remove="handleRemove"
>
  <n-button>Upload File</n-button>
</n-upload>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      fileList: [
        {
          id: 'url-test',
          name: 'URL Test',
          url: 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f',
          status: 'finished'
        },
        {
          id: 'text-message',
          name: 'Your text messages',
          status: 'error'
        },
        {
          id: 'notification',
          name: 'You notifications',
          status: 'finished'
        },
        {
          id: 'contact',
          name: 'You contact info',
          status: 'finished'
        }
      ]
    }
  },
  methods: {
    handleUploadChange ({ fileList }) {
      this.fileList = fileList
    },
    handleRemove ({ file, fileList }) {
      if (file.id === 'text-message') {
        this.message.info("Oops... It's now uploaded. Okay, delete it.")
      } else if (file.id === 'notification') {
        this.message.error('No, this is useful for us. Removal not allowed.')
        return false
      } else if (file.id === 'contact') {
        this.message.loading(
          "Don' know whether it is useful for us, let me ask the server",
          {
            duration: 4000
          }
        )
        return new Promise((resolve) => {
          setTimeout(() => {
            this.message.error("Oh no, they said you can't delete it too!")
            resolve(false)
          }, 4000)
        })
      }
    }
  }
}
```
