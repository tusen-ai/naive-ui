<markdown>
# Use Modal

</markdown>

<template>
  <n-button @click="handleClick">
    Come
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const modal = useModal()
    const message = useMessage()

    const handleClick = () => {
      const modalInst = modal.create({
        title: 'Modal',
        content: 'Content',
        preset: 'dialog'
      })
      message.info('Shut down in three seconds')
      setTimeout(() => {
        modalInst.destroy()
      }, 3000)
    }

    return {
      handleClick
    }
  }
})
</script>
