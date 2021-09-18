# 不需要包裹 DOM

`n-upload` 设置 `abstract`。

`n-upload-trigger`和 `n-upload-file-list` 需在 `n-upload` 内调用。

```html
<div>
  <n-upload
    abstract
    :default-file-list="fileList"
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  >
    <n-button-group>
      <n-button> Eat </n-button>
      <n-button> Sleep </n-button>
      <n-upload-trigger #="{handleClick}">
        <n-button @click="handleClick">Upload</n-button>
      </n-upload-trigger>
    </n-button-group>

    <n-card style="margin-top: 12px;" title="File List">
      <n-upload-file-list />
    </n-card>
  </n-upload>
</div>
```

```js
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const fileListRef = ref([
      {
        id: 'b',
        name: 'file.doc',
        status: 'finished',
        type: 'text/plain'
      }
    ])

    return { fileList: fileListRef }
  }
})
```
