# Drag to Upload
```html
<n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
  <n-upload-dragger>
    <div style="margin-bottom: 12px;">
      <n-icon size="48" :depth="3">
        <archive-icon />
      </n-icon>
    </div>
    <n-text style="font-size: 16px;">Click or drag file to this area to upload</n-text>
    <n-p depth="tertiary" style="margin-bottom: 0;">Strictly prohibit from uploading sensitive information. For example, your deposit card's password or your credit card's expiration date and security code.</n-p>
  </n-upload-dragger>
</n-upload>
```
```js
import { ArchiveOutline as ArchiveIcon }  from '@vicons/ionicons-v5'

export default {
  components: {
    ArchiveIcon
  }
}
```