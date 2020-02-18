# 手动提交
```html
<n-button @click="handleClick" style="margin-bottom: 12px;">上传文件</n-button>
<div style="overflow: hidden">
  <n-upload
    action="http://localhost:3000/upload-test"
    :default-upload="false"
    multiple
    ref="upload"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</div>
```
```js
import archiveOutline from 'naive-ui/lib/icons/archive-outline'

export default {
  components: {
    archiveOutline
  },
  methods: {
    handleClick () {
      this.$refs.upload.submit()
    }
  }
}
```