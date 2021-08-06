# Thumbnail File List

`list-type = 'picture'`

You can use `preview-file` to customize the thumbnails of the file

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="fileList"
  list-type="picture"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
export default {
  data () {
    return {
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
      ]
    }
  }
}
```
