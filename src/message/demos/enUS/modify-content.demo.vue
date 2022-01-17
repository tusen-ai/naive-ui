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
    const types: MessageType[] = ['success', 'info', 'warning', 'error', 'loading']
    const countRef = ref(0)
    const typeIndexRef = ref(0)
    let msgReactive:MessageReactive | null = null

    return {
      plus () {
        if (msgReactive) {
          countRef.value++
          msgReactive.content = '' + countRef.value
        }
      },
      changeType () {
        if (msgReactive) {
          typeIndexRef.value = (typeIndexRef.value + 1) % types.length
          msgReactive.type = types[typeIndexRef.value]
        }
      },
      createMessage () {
        msgReactive = message[types[typeIndexRef.value]]('' + countRef.value, {
          duration: 10000
        })
      }
    }
  }
})
</script>
