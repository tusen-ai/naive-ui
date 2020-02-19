# 拖拽上传
```html
<div style="overflow: hidden">
  <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
    <n-upload-dragger>
      <div style="margin-bottom: 12px;">
        <n-icon size="48" depth="tertiary">
          <archive-outline />
        </n-icon>
      </div>
      <n-text style="font-size: 16px;">点击或者拖动文件到该区域来上传</n-text>
      <n-p depth="tertiary" style="margin-bottom: 0;">请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码</n-p>
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