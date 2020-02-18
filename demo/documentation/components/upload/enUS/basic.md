# 基础用法
```html
<div style="overflow: hidden">
  <n-upload action="http://localhost:3000/upload-test">
    <n-upload-dragger>
      <div style="margin-bottom: 12px;">
        <n-icon size="48" tertiary>
          <archive-outline />
        </n-icon>
      </div>
      <n-text style="font-size: 16px;">Click or drag File to this area to upload</n-text>
      <n-p tertiary style="margin-bottom: 0;">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</n-p>
    </n-upload-dragger>
  </n-upload>
</div>
```
```js
import archiveOutline from 'naive-ui/lib/icons/archive-outline'

export default {
  components: {
    archiveOutline
  }
}
```