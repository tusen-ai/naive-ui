# 操作

```html
<n-space>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
    :actions="['confirm', 'cancel']"
  >
    <template #trigger>
      <n-button>引用</n-button>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
  </n-popconfirm>
  <n-popconfirm @positive-click="handlePositiveClick" :actions="['confirm']">
    <template #trigger>
      <n-button>只有确认</n-button>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
  </n-popconfirm>
  <n-popconfirm @negative-click="handleNegativeClick" :actions="['cancel']">
    <template #trigger>
      <n-button>只有取消</n-button>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
  </n-popconfirm>
  <n-popconfirm :actions="[]">
    <template #trigger>
      <n-button>什么也没有</n-button>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
  </n-popconfirm>
  <n-popconfirm>
    <template #trigger>
      <n-button>自定义 action</n-button>
    </template>
    <template #action>
      <n-tag type="primary">好的</n-tag>
    </template>
    一切都将一去杳然，任何人都无法将其捕获。
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
        message.info('是的')
      },
      handleNegativeClick () {
        message.info('并不')
      }
    }
  }
})
```
