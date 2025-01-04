<markdown>
# 可拖拽

设定 `draggable` 属性为 `true`，弹窗即可拖拽。如果你希望弹窗可以被拖出 window 的范围，可以设置 `draggable` 为 `{ bounds: 'none' }`。

如果你希望拖拽完全自定义 modal 的内容，你可以使用 `default` 插槽内的 `draggableClass`，设定在你希望触发拖拽的元素上。
</markdown>

<script lang="ts">
import { useModal } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  data() {
    const modal = useModal()

    function showDialogPreset() {
      modal.create({
        title: 'Dialog 预设拖拽',
        draggable: true,
        preset: 'dialog',
        content: '无意义的内容....'
      })
    }

    function showCardPreset() {
      modal.create({
        title: 'Card 预设拖拽',
        draggable: true,
        preset: 'card',
        content: '无意义的内容....'
      })
    }

    return {
      showModal1: ref(false),
      showModal2: ref(false),
      showModal3: ref(false),
      showModal4: ref(false),
      showCardPreset,
      showDialogPreset
    }
  }
})
</script>

<template>
  <n-flex>
    <n-button @click="showModal1 = !showModal1">
      card 预设
    </n-button>
    <n-button @click="showModal2 = !showModal2">
      dialog 预设
    </n-button>
    <n-button @click="showModal3 = !showModal3">
      无预设
    </n-button>
    <n-button @click="showDialogPreset">
      dialog 预设（命令式 Api）
    </n-button>
    <n-button @click="showCardPreset">
      card 预设（命令式 Api）
    </n-button>
    <n-button @click="showModal4 = !showModal4">
      弹窗嵌套
    </n-button>
  </n-flex>
  <n-modal
    v-model:show="showModal1"
    title="card 预设拖拽"
    preset="card"
    draggable
    :style="{ width: '800px' }"
  >
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
  </n-modal>
  <n-modal
    v-model:show="showModal2"
    title="dialog 预设拖拽"
    preset="dialog"
    draggable
    :style="{ width: '800px' }"
  >
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
  </n-modal>
  <n-modal
    v-model:show="showModal3"
    title="无预设拖拽"
    draggable
    :style="{ width: '800px' }"
  >
    <template #default="{ draggableClass }">
      <n-card>
        <div :class="draggableClass">
          点我拖拽
        </div>
      </n-card>
    </template>
  </n-modal>
  <n-modal
    v-model:show="showModal4"
    title="嵌套弹窗拖拽"
    preset="card"
    :draggable="{ bounds: 'none' }"
    :style="{ width: '800px' }"
  >
    <n-button @click="showDialogPreset">
      再开一个弹窗
    </n-button>
  </n-modal>
</template>
