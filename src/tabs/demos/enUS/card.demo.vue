<markdown>
# Card type

Set `type='card'`.
</markdown>

<template>
  <n-tabs
    v-model:value="name"
    type="card"
    closable
    tab-style="min-width: 80px;"
    @close="handleClose"
  >
    <n-tab-pane
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
    >
      {{ panel }}
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const nameRef = ref(1)
    const message = useMessage()
    const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    function handleClose (name: number) {
      const { value: panels } = panelsRef
      if (panels.length === 1) {
        message.error('The last one!')
        return
      }
      message.info('Close ' + name)
      const index = panels.findIndex((v) => name === v)
      panels.splice(index, 1)
      if (nameRef.value === name) {
        nameRef.value = panels[index]
      }
    }
    return {
      panels: panelsRef,
      name: nameRef,
      handleClose
    }
  }
})
</script>
