# 默认文件列表

```html
<n-upload
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  :default-file-list="defaultFileList"
>
  <n-button>上传文件</n-button>
</n-upload>
```

```js
export default {
  data() {
    return {
      defaultFileList: [
        {
          id: 'razars',
          name: '刀',
          status: 'finished'
        },
        {
          id: 'edge',
          name: '锋',
          status: 'finished'
        }
      ]
    }
  }
}
```
