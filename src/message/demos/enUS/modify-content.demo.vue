<markdown>
# Modify exist message
</markdown>

<template>
  <n-space>
    <n-button @click="createMessage">
      Create a Message Firstly
    </n-button>
    <n-button @click="changeType">
      Change Type
    </n-button>
    <n-button @click="plus">
      Plus 1
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
