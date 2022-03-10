<markdown>
# 修改创建的信息
</markdown>

<template>
  <n-space>
    <n-button @click="createMessage">
      先开个信息
    </n-button>
    <n-button @click="changeType">
      改变类型
    </n-button>
    <n-button @click="plus">
      加一
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage, MessageReactive, MessageType } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const types: MessageType[] = [
      'success',
      'info',
      'warning',
      'error',
      'loading'
    ]
    const countRef = ref(0)
    let typeIndex = 0
    let msgReactive: MessageReactive | null = null

    return {
      plus () {
        if (msgReactive) {
          countRef.value++
          msgReactive.content = '' + countRef.value
        }
      },
      changeType () {
        if (msgReactive) {
          typeIndex = (typeIndex + 1) % types.length
          msgReactive.type = types[typeIndex]
        }
      },
      createMessage () {
        msgReactive = message.create('' + countRef.value, {
          type: types[typeIndex],
          duration: 10000
        })
      }
    }
  }
})
</script>
