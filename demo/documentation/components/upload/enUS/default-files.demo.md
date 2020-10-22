# Default File List
```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="defaultFileList"
>
  <n-button>Upload File</n-button>
</n-upload>
```
```js
export default {
  data () {
    return {
      defaultFileList: [
        {
          id: 'the',
          name: 'The',
          status: 'finished'
        },
        {
          id: 'razars',
          name: 'Razars\'s',
          status: 'finished'
        },
        {
          id: 'edge',
          name: 'Blade',
          status: 'finished'
        },
      ]
    }
  }
}
```