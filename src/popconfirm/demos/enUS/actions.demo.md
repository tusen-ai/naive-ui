# Actions

```html
<n-space>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
    :actions="['confirm', 'cancel']"
  >
    <template #trigger>
      <n-button>Quote</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
  <n-popconfirm @positive-click="handlePositiveClick" :actions="['confirm']">
    <template #trigger>
      <n-button>Only confirm</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
  <n-popconfirm @negative-click="handleNegativeClick" :actions="['cancel']">
    <template #trigger>
      <n-button>Only cancel</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
  <n-popconfirm :actions="[]">
    <template #trigger>
      <n-button>Nothing</n-button>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
  <n-popconfirm>
    <template #trigger>
      <n-button>Custom action</n-button>
    </template>
    <template #action>
      <n-tag type="primary">Yes</n-tag>
    </template>
    Things pass us by. Nobody can catch them. That's the way we live our lives.
  </n-popconfirm>
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('Yes')
      },
      handleNegativeClick () {
        message.info('No')
      }
    }
  }
})
```
