# 加载失败

{{showError ? "别担心，柳暗花明又一村。" : "人生嘛，失败总是难免的。"}}

```html
<n-button
  type="primary"
  @click="showError = !showError"
  style="margin-bottom:10px"
  >{{showError ? "修复一下" : "干掉图片"}}</n-button
>
<n-space>
  <div style="margin-right: 10px">
    <n-tag type="success"> 默认样式 </n-tag>
    <div>
      <n-image
        width="100"
        :src="showError ? 'http://www.yi-schoo/logo.jpg' : 'http://www.yi-school.top/logo.jpg'"
        :canPreview="false"
      ></n-image>
    </div>
  </div>
  <div>
    <n-tag type="success"> error插槽样式 </n-tag>
    <div>
      <n-image
        width="200"
        height="200"
        :src="showError ? 'http://www.yi-schoo/logo.jpg' : 'http://www.yi-school.top/logo.jpg'"
        :canPreview="false"
      >
        <template #errorbox>
          <n-result status="404" size="small" title="404 资源不存在">
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
