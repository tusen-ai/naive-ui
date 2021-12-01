# Load failed

{{showError ? "Don't worry, the darkness will pass." : "In life, failure is inevitable."}}

```html
<n-button
  type="primary"
  @click="showError = !showError"
  style="margin-bottom:10px"
  >{{showError ? "To repair the image" : "Destroy the image"}}</n-button
>
<n-space>
  <div style="margin-right: 10px">
    <n-tag type="success"> Default style </n-tag>
    <div>
      <n-image
        width="100"
        :src="showError ? 'http://www.yi-schoo/logo.jpg' : 'http://www.yi-school.top/logo.jpg'"
        :canPreview="false"
      ></n-image>
    </div>
  </div>
  <div>
    <n-tag type="success"> Error slot style </n-tag>
    <div>
      <n-image
        width="200"
        height="200"
        :src="showError ? 'http://www.yi-schoo/logo.jpg' : 'http://www.yi-school.top/logo.jpg'"
        :canPreview="false"
      >
        <template #errorbox>
          <n-result
            status="404"
            size="small"
            title="404 Resources do not exist"
          >
          </n-result>
        </template>
      </n-image>
    </div>
  </div>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showError = ref(false)
    return {
      showError
    }
  }
})
```
